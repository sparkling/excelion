import React from 'react';
import styled from 'styled-components';

import Amount from './Amount';
import CurrencySelector from './CurrencySelector';
import MaxAmount from './MaxAmount';
import RateBox, {Type} from './RateBox';
import options from './CurrencySelector/options';
import { subscribeToRates, updateSubscription } from '../../api';
import ConfirmationModal from './ConfirmationModal';

const StyledTicket = styled.div `
  width: 20em;
`

const RateBoxes = styled.div `
  display: flex;
  width: 100%;
  margin: 1em 0;
  & > *:first-child {
    margin-right: 0.5em;
  }
`

const Footer = styled.form `
  display: flex;
  & > *:first-child {
    margin-right: 0.5em;
  }
`

const MAX_AMOUNT = "£50M EUR";
const CURRENCY_UPDATE_INTERVAL = 1000;

class Ticket extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currency: options[0],
      showModal: false,
    };
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onBuy = this.onBuy.bind(this);
    this.onSell = this.onSell.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.updateSubscription = this.updateSubscription.bind(this);
    this.onSubscriptionUpdate = this.onSubscriptionUpdate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.currentRate = this.currentRate.bind(this);
  }

  onSubscriptionUpdate(err, rates) {
    return this.setState(() => {
      return { rates }
    });
  }

  subscribe(currency) {
    subscribeToRates(this.onSubscriptionUpdate, CURRENCY_UPDATE_INTERVAL, currency && currency.value);
  }

  updateSubscription(currency) {
    updateSubscription(this.onSubscriptionUpdate, CURRENCY_UPDATE_INTERVAL, currency && currency.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currency && (prevState.currency.value !== this.state.currency.value)) {
      this.updateSubscription(this.state.currency);
    }
  }

  componentDidMount() {
    this.subscribe(this.state.currency);
  }

  onAmountChange(amount) {
    this.setState(() => {
      return { amount: amount }
    });
  }

  toggleModal() {
    this.setState(() => {
      return { showModal: !this.state.showModal }
    });
  }

  currentRate(type) {
    return (type === Type.SELL) ?
      parseFloat(this.state.rates.sell.mostSignificant + this.state.rates.sell.leastSignificant)
      :
      parseFloat(this.state.rates.buy.mostSignificant + this.state.rates.buy.leastSignificant)
  }

  onBuy() {
    this.state.amount && this.state.rates && this.setState(() => {
      return {
        showModal: true,
        modalType: Type.BUY,
        amount: this.state.amount,
        clickRate: this.currentRate(Type.BUY),
      }
    });
  }

  onSell() {
    this.state.amount && this.state.rates && this.setState(() => {
      return {
        showModal: true,
        modalType: Type.SELL,
        clickRate: this.currentRate(Type.SELL),
      }
    });
  }

  onCurrencyChange(currency) {
    this.setState(() => {
      return { currency: currency }
    });
  }

  render () {
    return (
      <React.Fragment>
        <StyledTicket>
          <CurrencySelector onChange={this.onCurrencyChange}/>
          <RateBoxes>
            <RateBox
              rateMostSignificantDigits={this.state.rates ? this.state.rates.sell.mostSignificant : "0"}
              rateLeastSignificantDigits={this.state.rates ? this.state.rates.sell.leastSignificant : "00"}
              currencySymbol={this.state.currency && this.state.currency.source}
              buySell={Type.SELL}
              onClick={this.onSell}
            />
            <RateBox
              rateMostSignificantDigits={this.state.rates ? this.state.rates.buy.mostSignificant : "0"}
              rateLeastSignificantDigits={this.state.rates ? this.state.rates.buy.leastSignificant : "00"}
              currencySymbol={this.state.currency && this.state.currency.source}
              buySell={Type.BUY}
              onClick={this.onBuy}
            />
          </RateBoxes>
          <Footer>
            <MaxAmount value={MAX_AMOUNT}/>
            <Amount
              value={this.state.amount}
              onValueChange={this.onAmountChange}
            />
          </Footer>
        </StyledTicket>
        <ConfirmationModal
          type={this.state.modalType}
          amount={this.state.amount}
          currency={this.state.currency}
          toggleModal={this.toggleModal}
          showModal={this.state.showModal}
          clickRate={this.state.clickRate}
        />
      </React.Fragment>
    );
  }
}

export default Ticket;
