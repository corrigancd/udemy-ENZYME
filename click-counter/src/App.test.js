import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

 /**
  * Factory function to create a ShallowWrapper for the App component.
  * @function setup
  * @param {object} props - Component props specific to this setup.
  * @returns {ShallowWrapper}
  */
 const setup = (props={}) =>shallow(<App { ...props }/>)
 
 /**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test c1scoL0ve!
 * 
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");  // do this first with an integer and show failure!
});

test('counter increments when button is clicked', () => {
  const wrapper = setup();
  
  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  // check the counter
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("1");
});

test('counter decrements when button is clicked and warning displayed', () => {
  const wrapper = setup();
  
  // find button and click
  const button = findByTestAttr(wrapper, 'decrement-button');

  // check there is no warning because the component initializes with 0
  const preDecrementWarning = findByTestAttr(wrapper, 'warning');
  expect(preDecrementWarning.length).toBe(0)
  
  // decrement the counter
  button.simulate('click');

  // verify that the test is below 0
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("-1");

  // check there is a warning displayed
  const postDecrementWarning = findByTestAttr(wrapper, 'warning');
  expect(postDecrementWarning.length).toBe(1)
});
