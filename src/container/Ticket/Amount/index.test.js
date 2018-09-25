import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Amount from './index.js';

const renderComponent = (props = {}) => shallow(<Amount {...props} />);
const defaultRender = renderComponent({onValueChange:()=>{}, value:123}).children().dive();

describe('<Amount />', () => {
  it('should render the same snapshot', () => {
    const tree = renderer.create(<Amount onValueChange={()=>{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the NumberFormat component', () => {
    expect(defaultRender.find('NumberFormat').length).toBe(1);
  });

  it('should use a thousand separator', () => {
    expect(defaultRender.prop('thousandSeparator')).toBe(true);
  });

  it('should call onChange when selection is made', () => {
    const onValueChange = sinon.spy();
    renderComponent({ onValueChange:onValueChange }).children().dive().simulate('valueChange');
    expect(onValueChange.called).toBe(true);
  });
});
