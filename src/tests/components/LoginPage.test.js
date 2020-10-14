import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render Login page correctly', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});
test('should call startLogin on button press', () => {
    // create a startLogin spy to dummy the function call
    const startLogin = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
    // now simulate click event
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});