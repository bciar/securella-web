import React from 'react';
import { shallow } from 'enzyme';
import { RequestPasswordReset } from '../../../components/user/RequestPasswordReset';

let history, wrapper;
beforeEach(() => {
    history = { push: jest.fn() };
    wrapper = shallow(<RequestPasswordReset history={history} />);
});

test('RequestPasswordReset page should be rendered', () => {
    expect(wrapper).toMatchSnapshot();
});

test('State should be changed correctly according to the user input', () => {
    const test_email = 'test-user@mail.com';
    wrapper.find('TextValidator').simulate('change', {
        target: { name: 'email', value: test_email }
    });
    expect(wrapper.state().formData.email).toEqual(test_email);
});

test('State submitted should be true', () => {
    wrapper.find('ValidatorForm').simulate('submit', history);
    expect(wrapper.state().submitted).toEqual(true);
})