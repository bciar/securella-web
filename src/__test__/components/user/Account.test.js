import React from 'react';
import { shallow } from 'enzyme';
import { Account } from '../../../components/user/Account';

let user, history, location, wrapper;
beforeEach(() => {
    user = jest.fn();
    location = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<Account user={user} history={history} location={location} />);
});

test('Account page should be rendered', () => {
    expect(wrapper).toMatchSnapshot();
});