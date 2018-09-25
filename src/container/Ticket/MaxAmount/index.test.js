import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import MaxAmount from './index.js';

const renderComponent = (props = {}) => shallow(<MaxAmount {...props} />);
const defaultRender = renderComponent({ onChange:()=>{} }).dive();

describe('<MaxAmount />', () => {

  it('should render the same snapshot', () => {
    const tree = renderer.create(<MaxAmount onChange={ ()=>{} } />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an input field', () => {
    expect(defaultRender.find('input').length).toBe(1);
  });

  it('should render the value', () => {
    const value="£50M EUR";
    expect(renderComponent({onChange:()=>{}, value:value}).dive().prop('value')).toBe(value);
  });

  it('should render readOnly="disabled"', () => {
    expect(defaultRender.prop('readOnly')).toBe('disabled');
  });

});
