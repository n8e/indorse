import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ParagraphInput from '../common/ParagraphInput';
import Button from '../common/Button';
import GreenParagraph from '../common/GreenParagraph';

const TitleParagraph = styled.p`
    font-size: xx-large;
`;

class RegisterCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
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
                    label="First Name"
                    inputType="text"
                    inputName="firstname"
                    required={false}
                    value={this.state.user.firstname}
                    changeHandler={this.inputChangeHandler}
                />
                <ParagraphInput
                    label="Last Name"
                    inputType="text"
                    inputName="lastname"
                    required={false}
                    value={this.state.user.lastname}
                    changeHandler={this.inputChangeHandler}
                />
                <ParagraphInput
                    label="User Name"
                    inputType="text"
                    inputName="username"
                    required={false}
                    value={this.state.user.username}
                    changeHandler={this.inputChangeHandler}
                />
                <ParagraphInput
                    label="Email"
                    inputType="email"
                    inputName="email"
                    required={true}
                    value={this.state.user.email}
                    changeHandler={this.inputChangeHandler}
                />
                <ParagraphInput
                    label="Password"
                    inputType="password"
                    inputName="password"
                    required={false}
                    value={this.state.user.password}
                    changeHandler={this.inputChangeHandler}
                />
                <ParagraphInput
                    label="Confirm Password"
                    inputType="password"
                    inputName="confirmPassword"
                    required={false}
                    value={this.state.user.confirmPassword}
                    changeHandler={this.inputChangeHandler}
                />
                <Button
                    text="sign up"
                    user={this.state.user}
                    onClickHandler={this.props.register}
                />
                <GreenParagraph
                    text="Tested by https://github.com/n8e"
                />
            </div>
        );
    }
}

RegisterCard.propTypes = {
    register: PropTypes.func
};

export default RegisterCard;
