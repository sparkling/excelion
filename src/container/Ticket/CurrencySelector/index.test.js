import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import CurrencySelector from './index.js';
import options from './options';

const renderComponent = (props = {}) => shallow(<CurrencySelector {...props} />);
const defaultRender = renderComponent({onChange:()=>{}}).dive().dive();

describe('<CurrencySelector />', () => {
  it('should render the same snapshot', () => {
    const tree = renderer.create(<CurrencySelector onChange={()=>{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the Select component', () => {
    expect(defaultRender.find('Select').length).toBe(1);
  });

  it('should call onChange when selection is made', () => {
    const onChange = sinon.spy();
    renderComponent({onChange:onChange}).dive().dive().simulate('change');
    expect(onChange.called).toBe(true);
  });

  it('should render the first option as the default value', () => {
    expect(defaultRender.dive().find('SingleValue').dive().text()).toBe(options[0].label);
  });

  it('should have all the options', () => {
    expect(defaultRender.dive().find('SingleValue').prop('options')).toMatchObject(options);
  });

});
