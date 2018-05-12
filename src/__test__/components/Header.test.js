import React from 'react';
import { shallow } from 'enzyme';
import { Head } from '../../components/Header';

test('Header page should be rendered', () => {
    const wrapper = shallow(<Head app={{ loaded: true }} user={{ loggedIn: true }}/>);
    expect(wrapper).toMatchSnapshot();
});