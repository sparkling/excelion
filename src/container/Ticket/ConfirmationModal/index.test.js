import React from 'react';
import 'jest-styled-components';
import ConfirmationModal from './index';
import { Type } from '../RateBox';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('<ConfirmationModal />', () => {

  it('should render the same buy snapshot', () => {
    const wrapper = mount(
      <ConfirmationModal
        type={Type.BUY}
        amount={10}
        currency={{"source":"EUR"}}
        toggleModal={()=>{}}
        showModal={true}
        clickRate={1.40123}
      /> );

      expect(toJson(wrapper)).toMatchSnapshot()
  });
  it('should render the same sell snapshot', () => {
    const wrapper = mount(
      <ConfirmationModal
        type={Type.SELL}
        amount={10}
        currency={{"source":"EUR"}}
        toggleModal={()=>{}}
        showModal={true}
        clickRate={1.40123}
      /> );

      expect(toJson(wrapper)).toMatchSnapshot()
  });

});
