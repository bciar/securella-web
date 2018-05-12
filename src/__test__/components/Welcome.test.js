import React from 'react';
import { shallow } from 'enzyme';
import { Welcome } from '../../components/Welcome';

test('Welcome page should be rendered', () => {
    const wrapper = shallow(<Welcome app={{ loaded: true }} user={{ loggedIn: true }}/>);
    expect(wrapper).toMatchSnapshot();
});