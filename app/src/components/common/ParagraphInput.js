import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StretchedInput = styled.input`
    box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	outline: none;
	display: block;
	width: 100%;
	padding: 7px;
	border: none;
	border-bottom: 1px solid #ddd;
	background: transparent;
	margin-bottom: 10px;
	font: 16px Arial, Helvetica, sans-serif;
	height: 45px;
`;

function ParagraphInput ({ label, inputType, inputName, required, value, changeHandler }) {
    return (
        <p>
            <StretchedInput
                type={inputType}
                name={inputName}
                required={required}
                placeholder={label}
                value={value}
                onChange={(e) => changeHandler(e)}
            />
        </p>
    );
}

ParagraphInput.propTypes = {
    label: PropTypes.string,
    inputType: PropTypes.string,
    inputName: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    changeHandler: PropTypes.func
};

export default ParagraphInput;
