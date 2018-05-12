import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../components/Home';

test('Home page should be rendered', () => {
    const user = jest.fn(), app = jest.fn();
    const wrapper = shallow(<Home app={app} user={user}/>);
    expect(wrapper).toMatchSnapshot();
});