import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from './Heading';
import LeastSignificant from './LeastSignificant';

export const Type = {
  "BUY": "BUY",
  "SELL": "SELL"
}

const Box = styled.div `
  font-family: arial;
  flex: 1;
  color: white;
  background-color: ${props => props.bgColor || "grey"};
`
Box.displayName = 'Box';

class RateBox extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      bgColor: "grey",
    };
  }

  componentDidUpdate(prevProps) {
    const prevValue = parseInt(prevProps.rateLeastSignificantDigits, 10);
    const nextValue = parseInt(this.props.rateLeastSignificantDigits, 10);

    if (prevValue > nextValue) {
      this.setDecrease();
    }
    else if (prevValue < nextValue) {
      this.setIncrease();
    }
  }

  setIncrease() {
    this.setState(() => {
      return { bgColor: "blue"}
    });
  }

  setDecrease() {
    this.setState(() => {
      return { bgColor: "red"}
    });
  }

  render () {
    return (
      <Box bgColor={this.state.bgColor} onClick={this.props.onClick}>
        <Heading
          buySell={this.props.buySell}
          currencySymbol={this.props.currencySymbol}
          rateMostSignificantDigits={this.props.rateMostSignificantDigits}
        />
        <LeastSignificant
          rateLeastSignificantDigits={this.props.rateLeastSignificantDigits}
        />
      </Box>
    );
  }
}

RateBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  rateMostSignificantDigits: PropTypes.string.isRequired,
  rateLeastSignificantDigits: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  buySell: PropTypes.string.isRequired,
}

export default RateBox;
