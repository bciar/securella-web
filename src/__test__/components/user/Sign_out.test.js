import React from 'react';
import { shallow } from 'enzyme';
import { SignOut } from '../../../components/user/Sign_out';

let history, wrapper;

beforeEach(() => {
    history = { push: jest.fn() };
    wrapper = shallow(<SignOut history={history} />);
});

test('should render SignOut page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should be redirected to root', () => {
    expect(history.push).toHaveBeenLastCalledWith('/');
});
