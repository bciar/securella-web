/* import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from '../../../components/user/Sign_in';
import users from '../../fixtures/users';

let user, history, wrapper;

beforeEach(() => {
    user = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<SignIn user={user} history={history} />);
});

test('should render SignIn page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should be test email on TextValidator change', () => {
    const value = 'test-user@mail.com';
    wrapper.find('TextValidator').at(0).simulate('change', {
      target: { name: 'email', value }
    });
    expect(wrapper.state().formData.email).toBe(value);
});

test('should be password on TextValidator change', () => {
    const value = 'password';
    wrapper.find('TextValidator').at(1).simulate('change', {
      target: { name: 'password', value }
    });
    expect(wrapper.state().formData.password).toBe(value);
});

test('should be logged in when the ValidatorForm submit', () => {
    wrapper.setState({
        formData: users[0]
    });
    expect(wrapper.state().formData.email).toBe('mamosd1018@gmail.com');
    expect(wrapper.state().formData.password).toBe('123456789');
    expect(wrapper.find('TextValidator').at(0).props().value).toBe('mamosd1018@gmail.com');
    expect(wrapper.find('TextValidator').at(1).props().value).toBe('123456789');
    wrapper.find('ValidatorForm').simulate('submit', history);
    expect(wrapper.state().submitted).toBe(true);
});

test('should be redirected to dashboard', () => {
    wrapper = shallow(<SignIn user={{loggedIn: true}} history={history} />);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
});
  */
 test('test');