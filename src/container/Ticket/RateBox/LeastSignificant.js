import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLeastSignificant = styled.div `
  text-align: center;
`

const Digit = styled.span `
  font-size: 5em;
  &:last-child {
    font-size: 2em;
  }
`
Digit.displayName='Digit';

const LeastSignificant = ({ rateLeastSignificantDigits }) => {
  const digits = rateLeastSignificantDigits.split("").map((digit, idx) => {
      return <Digit key={idx}>{digit}</Digit>;
    });

  return (<StyledLeastSignificant>{digits}</StyledLeastSignificant>);
}

LeastSignificant.propTypes = {
  rateLeastSignificantDigits: PropTypes.string.isRequired
}

export default LeastSignificant;
