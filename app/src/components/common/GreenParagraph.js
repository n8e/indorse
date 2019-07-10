import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TextDiv = styled.div`
    color: #5BBE83;
    display: inline-block;
    line-height: 0.1;
    margin-right: 2px;
    text-align: center;
`;

function GreenParagraph ({ text }) {
    return (
        <TextDiv>{text}</TextDiv>
    );
}

GreenParagraph.propTypes = {
    text: PropTypes.string
};

export default GreenParagraph;
