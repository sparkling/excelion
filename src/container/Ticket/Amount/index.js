import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const StyledInput = styled(NumberFormat) `
  font-size: 1em;
  flex: 1;
  text-align: center
`

const Amount = ({ onValueChange, value }) =>
  (<StyledInput
      value={value}
      thousandSeparator={true}
      type="text"
      name="amount"
      onValueChange={(values) => onValueChange(values && values.floatValue)}
    />);


Amount.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.number
}

export default Amount;
