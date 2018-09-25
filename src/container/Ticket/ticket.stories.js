import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import selectorDoc from './CurrencySelector/README.md';
import CurrencySelector from './CurrencySelector';
import Amount from './Amount';
import MaxAmount from './MaxAmount';
import Ticket from './index';
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
  .addParameters({ info:{text:selectorDoc} })
  .add('Default', () => (
    <Ticket />),
    { notes:defaultNotes });

storiesOf('Currency Selector', module)
  .addParameters({ info:{text:selectorDoc} })
  .add('Default', () => (
    <CurrencySelector onChange={ logAction } />),
    { notes:defaultNotes });

storiesOf('Input Amount', module)
  .addParameters({ info:{text:selectorDoc} })
  .add('Default', () => (
    <Amount
      value={9000000}
      onValueChange={logAction}
    />),
    { notes:defaultNotes });

storiesOf('Max Amount', module)
    .add('Default', () => (
      <MaxAmount value="£50M EUR" />),
      { notes:defaultNotes });

storiesOf('Rate Box', module)
    .add('Buy', () => (
      <RateBox
        rateMostSignificantDigits="1.40"
        rateLeastSignificantDigits="872"
        currencySymbol="EUR"
        buySell={Type.BUY}
        onClick={logAction}
       />),
       { notes:defaultNotes })
     .add('Sell', () => (
       <RateBox
         rateMostSignificantDigits="1.40"
         rateLeastSignificantDigits="872"
         currencySymbol="EUR"
         buySell={Type.SELL}
         onClick={logAction}
        />),
        { notes:defaultNotes });
