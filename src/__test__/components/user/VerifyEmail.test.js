import React from 'react';
import { shallow } from 'enzyme';
import { VerifyEmail } from '../../../components/user/VerifyEmail';

test('VerifyEmail page should be rendered', () => {
    const wrapper = shallow(<VerifyEmail />);
    expect(wrapper).toMatchSnapshot();
});