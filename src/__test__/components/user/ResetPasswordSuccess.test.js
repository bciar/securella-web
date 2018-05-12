import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordSuccess } from '../../../components/user/ResetPasswordSuccess';

test('RequestPasswordReset page should be rendered', () => {
    const wrapper = shallow(<ResetPasswordSuccess />);
    expect(wrapper).toMatchSnapshot();
});