import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import ticketDoc from './README.md';
import currencySelectorDoc from './CurrencySelector/README.md';
import amountDoc from './Amount/README.md';
import confirmationModalDoc from './ConfirmationModal/README.md';
import maxAmountDoc from './MaxAmount/README.md';
import rateBoxDoc from './RateBox/README.md';
import CurrencySelector from './CurrencySelector';
import Amount from './Amount';
import MaxAmount from './MaxAmount';
import Ticket from './index';
import ConfirmationModal from './ConfirmationModal';
import RateBox, {Type} from './RateBox';

addDecorator(story => (
  <div style={{maxWidth: '800px'}}>
    {story()}
  </div>
))

const defaultNotes = `The default rendering, does not take any rendering options.

Click 'Show Info' for more details`;

const logAction = (value) => { console.log(value) }

storiesOf('Ticket', module)
  .addParameters({ info:{text:ticketDoc} })
  .add('Default', () => (
    <Ticket />),
    { notes:`<b>Important</b><br/>

      To see the component in action, you need to first start the server with \`node server\`

      Click 'Show Info' for more details` });

storiesOf('Confirmation Modal', module)
  .addParameters({ info:{text:confirmationModalDoc} })
  .add('Default', () => (
    <ConfirmationModal
      type={Type.BUY}
      amount={10}
      currency={{"source":"EUR"}}
      toggleModal={()=>{}}
      showModal={true}
      clickRate={1.40123}
    />),
    { notes:defaultNotes });

storiesOf('Currency Selector', module)
  .addParameters({ info:{text:currencySelectorDoc} })
  .add('Default', () => (
    <CurrencySelector onChange={ logAction } />),
    { notes:defaultNotes });

storiesOf('Amount', module)
  .addParameters({ info:{text:amountDoc} })
  .add('Default', () => (
    <Amount
      value={9000000}
      onValueChange={logAction}
    />),
    { notes:defaultNotes });

storiesOf('Max Amount', module)
    .addParameters({ info:{text:maxAmountDoc} })
    .add('Default', () => (
      <MaxAmount value="£50M EUR" />),
      { notes:defaultNotes });

storiesOf('Rate Box', module)
    .addParameters({ info:{text:rateBoxDoc} })
    .add('Buy', () => (
      <div style={{width: "10em"}}>
        <RateBox
          rateMostSignificantDigits="1.40"
          rateLeastSignificantDigits="872"
          currencySymbol="EUR"
          buySell={Type.BUY}
          onClick={logAction}
        />
      </div>),
       { notes:defaultNotes })
     .add('Sell', () => (
       <div style={{width: "10em"}}>
         <RateBox
           rateMostSignificantDigits="1.40"
           rateLeastSignificantDigits="872"
           currencySymbol="EUR"
           buySell={Type.SELL}
           onClick={logAction}
         />
       </div>),
        { notes:defaultNotes });
