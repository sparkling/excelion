import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input `
  width: 7em;
  font-size: 1em;
  padding: 0.5em;
  text-align: center
`

const MaxAmount = ({ value }) =>
  (<StyledInput
      value={value}
      type="text"
      name="maxAmount"
      readOnly="disabled"
    />);


MaxAmount.propTypes = {
  value: PropTypes.string
}

export default MaxAmount;
