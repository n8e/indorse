import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ParagraphInput from '../common/ParagraphInput';
import Button from '../common/Button';
import GreenParagraph from '../common/GreenParagraph';

const TitleParagraph = styled.p`
    font-size: xx-large;
`;

class LoginCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        };

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    inputChangeHandler (evt) {
        const { name, value } = evt.target;
        this.setState({ user: Object.assign(this.state.user, {}, { [name]: value }) });
    }

    render () {
        return (
            <div>
                <TitleParagraph><strong>Indorse</strong>:</TitleParagraph>
                <ParagraphInput
                    label="User Name"
                    inputType="text"
                    inputName="username"
                    required={true}
                    value={this.state.user.username}
                    changeHandler={this.inputChangeHandler}
                />
                <ParagraphInput
                    label="Password"
                    inputType="password"
                    inputName="password"
                    required={true}
                    value={this.state.user.password}
                    changeHandler={this.inputChangeHandler}
                />
                <p>Forgot Password</p>
                <Button
                    text="login"
                    user={this.state.user}
                    onClickHandler={this.props.login}
                />
                <p>Don't Have Account?</p>
                <Button
                    text="sign up now"
                    onClickHandler={(evt) => this.props.switchToSignUp(evt, 'signup')}
                />
                <GreenParagraph
                    text="Tested by https://github.com/n8e"
                />
            </div>
        );
    }
}

LoginCard.propTypes = {
    login: PropTypes.func,
    switchToSignUp: PropTypes.func
};

export default LoginCard;
