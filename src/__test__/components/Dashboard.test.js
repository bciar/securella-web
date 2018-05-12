import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../components/Dashboard';

let test_alarm_data = {
    status: "closed",
    latitude: 37.0212334, 
    longitude: -81.234235
};

let user, history, wrapper;
beforeEach(() => {
    user = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<Dashboard user={user} history={history} />);
});

test('Dashboard component should be rendered', () => {
    wrapper.setState({ alarmData: test_alarm_data });
    expect(wrapper).toMatchSnapshot();
});

test('alarm data should be set when the TextValidator is changed', () => {
    wrapper.find('TextValidator').at(0).simulate('change', {
        target: { name: 'latitude', value: test_alarm_data.latitude }
    });
    wrapper.find('TextValidator').at(1).simulate('change', {
        target: { name: 'longitude', value: test_alarm_data.longitude }
    });
    expect(wrapper.state().alarmData).toEqual(test_alarm_data);
});