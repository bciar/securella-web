import React from 'react';
import { shallow } from 'enzyme';
import { RequestPasswordSuccess } from '../../../components/user/RequestPasswordSuccess';

test('RequestPasswordReset page should be rendered', () => {
    const wrapper = shallow(<RequestPasswordSuccess />);
    expect(wrapper).toMatchSnapshot();
});