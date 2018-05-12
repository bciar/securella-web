import React from 'react';
import { shallow } from 'enzyme';
import { UserImage } from '../../../components/user/UserImage';

let history, wrapper;
beforeEach(() => {
    history = { push: jest.fn() };
    wrapper = shallow(<UserImage history={history} />);
});

test('UserImage component should be rendered correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('cancel button should redirect page to account page', () => {
    wrapper.find('RaisedButton').at(1).simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/account');
});

test('dialog requests close', () => {
    wrapper.find('Dialog').simulate('requestClose');
    expect(wrapper.state().error).toEqual('');
});

