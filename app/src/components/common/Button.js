import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const GreenButton = styled.button `
    background-color: #5BBE83;
    border-radius: 30px;
    color: #FFF;
    font-size: large;
    font-weight: 600;
    height: 60px;
    width: 100%;
`;

function Button ({ text, user, onClickHandler }) {
    return (
        <p>
            <GreenButton onClick={() => onClickHandler(user)}>
                {text.toUpperCase()}
            </GreenButton>
        </p>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    user: PropTypes.object,
    onClickHandler: PropTypes.func
};

export default Button;
