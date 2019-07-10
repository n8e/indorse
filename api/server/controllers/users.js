var serverConfig = require('../config/serverConfig'),
  jsonwebtoken = require('jsonwebtoken'),
  secretKey = serverConfig.secretKey,
  models = require('../models'),
  mailer = require('../helpers/mailer');

// create token for authentication
function createToken(user) {
  return jsonwebtoken.sign({
    id: user._id,
    name: user.name,
    username: user.username
  }, secretKey, {
      expiresIn: "1d"
    });
}

module.exports = {
  createUser: function (req, res, next) {
    var user = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    return models.User.create(user)
      .then((user) => {
        mailer(user.email, createToken(user))
          .then(() => {
            return res.json({
              success: true,
              message: 'User has been created!'
            });
          });
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  },

  confirmUserEmail: function (req, res, next) {
    const { username } = jsonwebtoken.verify(req.params.token, secretKey);

    return models.User.update({ confirmed: true }, { where: { username: username } })
      .then((user) => {
        return res.json({
          success: true,
          message: 'Email confirmed'
        });
      })
      .catch(e => res.status(400).send('Error', e));
  },

  login: function (req, res, next) {
    return models.User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        // compare passwords with db user's password
        if (!user.comparePassword(req.body.password)) {
          throw new Error('Invalid Password');
        }

        if (!user.confirmed) {
          throw new Error('Please confirm your email to login');
        }

        return user;
      })
      .then((user) => {
        return res.json({
          id: user._id,
          success: true,
          message: "Successfully logged in!",
          token: createToken(user)
        });
      })
      .catch((err) => res.status(400).send(err));
  },

  logout: function (req, res) {
    delete req.headers['x-access-token'];

    return res.status(200).json({
      "message": "User has been successfully logged out"
    });
  },

  getAllUsers: function (req, res, next) {
    return models.User.findAll()
      .then(users => res.json(users))
      .catch((err) => res.status(400).send(err));
  },

  getUser: function (req, res) {
    var id = req.param('id');

    return models.User.findById(id)
      .then(user => res.json(user))
      .catch((err) => res.status(400).send(err));
  },

  deleteUser: function (req, res) {
    var id = req.param('id');

    return models.User.destroy({ where: { id: id } })
      .then(() => res.status(200).json({
        success: true,
        message: `User with id: ${id} has been deleted!`
      }))
      .catch((err) => res.status(400).send(err));
  },

  updateUser: function (req, res) {
    var id = req.param('id'),
      updatedUser = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmed: req.body.confirmed
      };

    return models.User.update(updatedUser, { where: { id: id } })
      .then(() => res.status(200).json({
        success: true,
        message: `User with id: ${id} has been updated!`
      }))
      .catch((err) => res.status(400).send(err));
  },
}