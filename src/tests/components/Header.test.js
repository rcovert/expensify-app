import React from 'react';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { Header } from '../../components/Header';

test('should render header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    // expect(toJSON(wrapper)).toMatchSnapshot();
    // note - json utility installed as serializer
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.find('h1').text()).toBe('Expensify');
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    // console.log(renderer.getRenderOutput());
});

test('should call startLogout on button press', () => {
    // create a startLogout spy to dum((my the function call
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    // now simulate click event
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
})