var assert = require('assert'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app'),
    apiHost = 'http://localhost:8080',
    testUser = {
        username: 'batman',
        firstname: 'Bruce',
        lastname: 'Wayne',
        email: 'mc-hariah@hotmail.com',
        password: '12345'
    },
    storedTestUser;

chai.use(chaiHttp);

describe('Users Tests', function() {

    it('should show that a new user is created (POST /users)', function (done) {
        chai.request(apiHost)
            .post('/users/')
            .send(testUser)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(typeof res.body, 'object');
                assert.equal(res.body.success, true);
                assert.equal(res.body.message, 'User has been created!');
                done();
            });
    });
  
    it('validates that the new user created is unique (POST /users)', function (done) {
        chai.request(apiHost)
            .post('/users')
            .send(testUser)
            .end(function (err, res) {
                assert.equal(res.status, 400);
                assert.equal(res.body.name, 'SequelizeUniqueConstraintError');
                assert.equal(res.body.parent.detail, 'Key (email)=(mc-hariah@hotmail.com) already exists.');
                done();
            });
    });
  
    it('validates that all users are returned when getAllUsers ' +
      'function in the controller is called (GET /users)', function (done) {
          chai.request(apiHost)
            .get('/users')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                storedTestUser = res.body[res.body.length - 1];
                assert.equal(res.status, 200);
                assert.equal(res.body.length > 0, true);
                assert.equal(res.body[res.body.length - 1].username, testUser.username);
                assert.equal(res.body[res.body.length - 1].email, testUser.email);
                done();
            });
    });


    it('validates that an existing user cannot be logged in if email is not verified', function(done) {
        chai.request(apiHost)
            .post('/users/login')
            .send({
                username: testUser.username,
                password: testUser.password
            })
            .end(function (err, res) {
                assert.equal(res.status, 400);
                done();
            });
    });

    it('validates that an existing user can be logged in when email is verified', function (done) {
        var updatedUser = Object.assign(storedTestUser, {}, { confirmed: true });

        chai.request(apiHost)
            .put('/users/' + storedTestUser.id)
            .send(updatedUser)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.success, true);
                assert.equal(res.body.message, `User with id: ${storedTestUser.id} has been updated!`);

                if (res.body.success) {
                    chai.request(apiHost)
                        .post('/users/login')
                        .send({
                            username: testUser.username,
                            password: testUser.password
                        })
                        .end(function (err, res) {
                            assert.equal(res.status, 200);
                            assert.equal(res.body.success, true);
                            assert.equal(res.body.message, 'Successfully logged in!');
                            assert.equal(res.body.token !== undefined, true);
                            done();
                        });
                }
            });
      });
  
    it('validates that an invalid user cannot be logged in', function (done) {
        chai.request(app)
            .post('/users/login')
            .send({
                username: 'rupertm',
                password: '67891'
            })
            .end(function (err, res) {
                assert.equal(res.status, 400);
                assert.equal(res.body.name, 'SequelizeHostNotFoundError');
                assert.equal(res.body.parent.errno, 'ENOTFOUND');
                done();
            });
    });
});