import React from 'react';
import { shallow } from 'enzyme';
import { UpdateProfile } from '../../../components/user/UpdateProfile';

let history, wrapper;
const profile_test_data = {
    firstname:   'Guothe',
    lastname:    'Wolfgang',
    address:     'Test Street',
    city:        'Berlin',
    postal_code: '12345',
    age:         '35',
    gender:      'male'
};

beforeEach(() => {
    history = { push: jest.fn() };
    wrapper = shallow(<UpdateProfile history={history} />);
});

test('should render UpdateProfile page correctly when the loaded state is true', () => {
    expect(wrapper).toMatchSnapshot();
});

test('formData state should be changed along the text are inputted', () => {
    wrapper.find('TextValidator').at(0).simulate('change', {
        target: { name: 'firstname', value: profile_test_data.firstname }
    });
    wrapper.find('TextValidator').at(1).simulate('change', {
        target: { name: 'lastname', value: profile_test_data.lastname }
    });
    wrapper.find('TextValidator').at(2).simulate('change', {
        target: { name: 'address', value: profile_test_data.address }
    });
    wrapper.find('TextValidator').at(3).simulate('change', {
        target: { name: 'postal_code', value: profile_test_data.postal_code }
    });
    wrapper.find('TextValidator').at(4).simulate('change', {
        target: { name: 'city', value: profile_test_data.city }
    });
    wrapper.find('TextValidator').at(5).simulate('change', {
        target: { name: 'age', value: profile_test_data.age }
    });
    wrapper.find('TextValidator').at(6).simulate('change', {
        target: { name: 'gender', value: profile_test_data.gender }
    });
    expect(wrapper.state().formData).toEqual(profile_test_data);
});

test('submit form should work correctly', () => {
    wrapper.setState({
        formData: profile_test_data
    });
    expect(wrapper.find('TextValidator').at(0).props().value).toEqual(profile_test_data.firstname);
    expect(wrapper.find('TextValidator').at(1).props().value).toEqual(profile_test_data.lastname);
    expect(wrapper.find('TextValidator').at(2).props().value).toEqual(profile_test_data.address);
    expect(wrapper.find('TextValidator').at(3).props().value).toEqual(profile_test_data.postal_code);
    expect(wrapper.find('TextValidator').at(4).props().value).toEqual(profile_test_data.city);
    expect(wrapper.find('TextValidator').at(5).props().value).toEqual(profile_test_data.age);
    expect(wrapper.find('TextValidator').at(6).props().value).toEqual(profile_test_data.gender);
    wrapper.find('ValidatorForm').simulate('submit', history);
    expect(wrapper.state().submitted).toEqual(true);
});
