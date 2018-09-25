import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select'
import options from './options';

const StyledSelect = styled(Select)`
  width: 8em;
`;

const DEFAULT = options[0];

const Selector = ({ onChange }) =>
  (<StyledSelect
    options={options}
    defaultValue={DEFAULT}
    onChange={onChange}
  />);

Selector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Selector;
