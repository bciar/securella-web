import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmEmail } from '../../../components/user/ConfirmEmail';

let wrapper;

test('Thank you page should be rendered when the confirmed state is true', () => {
    wrapper = shallow(<ConfirmEmail />);
    wrapper.setState({ confirmed: true });
    expect(wrapper).toMatchSnapshot();
});

test('Sorry page should be rendered when the confirmed state is false', () => {
    wrapper = shallow(<ConfirmEmail />);
    wrapper.setState({ confirmed: false });
    expect(wrapper).toMatchSnapshot();
});