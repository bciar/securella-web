import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../../components/user/Sign_up';

let user, wrapper;
const signup_test_data = {
    email: 'test-user@mail.com', 
    password: 'password', 
    repeatPassword: 'password'
};

beforeEach(() => {
    user = jest.fn();
    wrapper = shallow(<SignUp app={{loaded: true}} user={user} />);
});

test('should render Signup page correctly when the loaded state is true', () => {
    expect(wrapper).toMatchSnapshot();
});

test('spinner should be rendered if the app loaded state is false', () => {
    wrapper = shallow(<SignUp app={{loaded: false}} user={user} />);
    expect(wrapper).toMatchSnapshot();
});

test('formData state should be changed along the text are inputted', () => {
    wrapper.find('TextValidator').at(0).simulate('change', {
        target: { name: 'email', value: signup_test_data.email }
    });
    wrapper.find('TextValidator').at(1).simulate('change', {
        target: { name: 'password', value: signup_test_data.password }
    });
    wrapper.find('TextValidator').at(2).simulate('change', {
        target: { name: 'repeatPassword', value: signup_test_data.repeatPassword }
    });
    expect(wrapper.state().formData).toEqual(signup_test_data);
});

test('submit form should work correctly', () => {
    wrapper.setState({
        formData: signup_test_data
    });
    const history = jest.fn();
    expect(wrapper.find('TextValidator').at(0).props().value).toEqual(signup_test_data.email);
    expect(wrapper.find('TextValidator').at(1).props().value).toEqual(signup_test_data.password);
    expect(wrapper.find('TextValidator').at(2).props().value).toEqual(signup_test_data.repeatPassword);
    wrapper.find('ValidatorForm').simulate('submit', history);
    expect(wrapper.state().submitted).toEqual(true);
});
