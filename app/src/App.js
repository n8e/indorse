import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import RegisterCard from './components/register/RegisterCard';
import LoginCard from './components/login/LoginCard';
import { requester } from './helpers/requester';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            apiResponse: '',
            register: {
                success: false,
                error: null
            },
            login: {
                success: false,
                error: null
            }
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.openCta = this.openCta.bind(this);
    }

    handleSignup ({ firstname, lastname, username, email, password, confirmPassword }) {
        if (!firstname || !lastname || !username || !email || !password) {
            this.setState({
                register: Object.assign(this.state.register, {}, {
                    error: 'Fields cannot be empty'
                })
            });
        } else if (password !== confirmPassword) {
            this.setState({
                register: Object.assign(this.state.register, {}, {
                    error: 'Passwords are not the same!'
                })
            });
        } else {
            requester('POST', 'http://localhost:8080/users/', { firstname, lastname, username, email, password })
                .then(data => {
                    if (data.success) {
                        return this.setState({
                            register: Object.assign(this.state.register, {}, {
                                success: data.success
                            })
                        });
                    }
                    return this.setState({
                        register: Object.assign(this.state.register, {}, {
                            error: 'Error while registering user!'
                        })
                    });
                });
        }
    }

    handleLogin ({ username, password }) {
        if (!username || !password) {
            this.setState({
                login: Object.assign(this.state.login, {}, {
                    error: 'Fields cannot be empty'
                })
            });
        } else {
            requester('POST', 'http://localhost:8080/users/login', { username, password })
                .then(data => {
                    if (data.success) {
                        return this.setState({
                            login: Object.assign(this.state.login, {}, {
                                success: data.success
                            })
                        });
                    }
                    return this.setState({
                        login: Object.assign(this.state.login, {}, {
                            error: 'User not found! If already registered, please verify your email first'
                        })
                    });
                });
        }
    }

    openCta (evt, type) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(type).style.display = "block";
        evt.currentTarget.className += " active";
    }

    render () {
        return (
            <div className = "indorse card">
                <div className="tab">
                    <button className="tablinks" onClick={(evt) => this.openCta(evt, 'signin')}>Signin</button>
                    <button className="tablinks" onClick={(evt) => this.openCta(evt, 'signup')}>Signup</button>
                </div>
                <div id="signup" className="tabcontent">
                    {(this.state.register.success) ? (
                        <div>
                            You have Registered successfully. We have sent you a link to verify your email.
                        </div>
                    ) : (
                        <div>
                            {(this.state.register.error) ? (
                                <div className="error">{this.state.register.error}</div>
                            ) : null}
                            <RegisterCard register={this.handleSignup}/>
                        </div>
                    )}
                </div>
                <div id="signin" className="tabcontent">
                    {(this.state.login.success) ? (
                        <div>
                        You have logged in successfully.
                        </div>
                    ) : (
                        <div>
                            {(this.state.login.error) ? (
                                <div className="error">{this.state.login.error}</div>
                            ) : null}
                            <LoginCard login={this.handleLogin} switchToSignUp={this.openCta} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

export default App;
