import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Type} from './index';

const StyledHeading = styled.div `
  display: flex;
  flex-direction: ${props => props.buySell === Type.BUY ? "row-reverse" : "row"};
  padding: 0.5em 0.75em;
  & > *:${props => props.buySell === Type.BUY ? "last" : "first"}-child {
    flex: 1;
  }
`

const MostSignificant = styled.div `
  font-size: 0.8em;
`
MostSignificant.displayName = 'MostSignificant';

const Action = styled.div `
  font-size: 0.8em
`
Action.displayName = 'Action';

const Heading = ({ rateMostSignificantDigits, buySell, currencySymbol }) =>
  (<StyledHeading buySell={buySell} >
    <Action>{buySell} {currencySymbol}</Action>
    <MostSignificant>{rateMostSignificantDigits}</MostSignificant>
  </StyledHeading>);

Heading.propTypes = {
  rateMostSignificantDigits: PropTypes.string.isRequired,
  buySell: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
}

export default Heading;
