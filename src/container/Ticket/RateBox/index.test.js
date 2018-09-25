import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { mount } from 'enzyme';
import RateBox, {Type} from './index.js';

const defaultRateLeastSignificantDigits = "841"
const defaultRateMostSignificantDigits = "1.40"
const defaultCurrencySymol = "EUR";
const defaultBuySell = Type.BUY;
const defaultMockCallBack = jest.fn();

const defaultMount = mount(
  <RateBox
    rateMostSignificantDigits={defaultRateMostSignificantDigits}
    rateLeastSignificantDigits={defaultRateLeastSignificantDigits}
    currencySymbol={defaultCurrencySymol}
    buySell={defaultBuySell}
    onClick={defaultMockCallBack}
   />);

describe('<RateBox />', () => {

  it('should render the same BUY snapshot', () => {
    const tree = renderer.create(<RateBox
      rateMostSignificantDigits="1.40"
      rateLeastSignificantDigits="872"
      currencySymbol="EUR"
      buySell={Type.BUY}
      onClick={()=>{}}
     />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the same SELL snapshot', () => {
    const tree = renderer.create(<RateBox
      rateMostSignificantDigits="1.40"
      rateLeastSignificantDigits="872"
      currencySymbol="EUR"
      buySell={Type.SELL}
      onClick={()=>{}}
     />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an action description', () => {
    expect(defaultMount.find('Action').text()).toBe(`${defaultBuySell} ${defaultCurrencySymol}`);
  });

  it('should render most significant digits', () => {
    expect(defaultMount.find('MostSignificant').text()).toBe(defaultRateMostSignificantDigits);
  });

  it('should render least significant digits', () => {
    expect(defaultMount.find('LeastSignificant').render().text()).toBe(defaultRateLeastSignificantDigits);
  });

  it('should capture a click', () => {
    defaultMount.simulate('click');
    expect(defaultMockCallBack.mock.calls.length).toEqual(1);
  });

  it('should change background to red when rate is lowered', () => {
    const value = parseInt(defaultRateLeastSignificantDigits, 10);
    defaultMount.setProps({ rateLeastSignificantDigits: (value - 1).toString() });
    defaultMount.update();
    expect(defaultMount.find('Box').prop('bgColor')).toEqual('red');
  });

  it('should change background to blue when rate is increased', () => {
    const value = parseInt(defaultRateLeastSignificantDigits, 10);
    defaultMount.setProps({ rateLeastSignificantDigits: (value + 1).toString() });
    defaultMount.update();
    expect(defaultMount.find('Box').prop('bgColor')).toEqual('blue');
  });

});
