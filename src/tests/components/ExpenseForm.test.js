import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot(); 
});

test('should render expense form with correct data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot(); 
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot(); 
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    // testing that an empty form submission results in an error msg
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); 
});

test('should set description state on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    // use wrapper find to find the element we want to change
    // find at 0 finds the first input field in the form -- description
    // simulate change needs a value for the e object 
    // which is target.value
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note state on input change', () => {
    const value = 'New note texted';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set amount with valid amount', () => {
    const value = '123.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});
test('should not set amount with invalid amount input', () => {
    const value = '123.50.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});
test('should call onsubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    // creates mock function
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    // now simulate submission
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});
test('should set new date on date change', () => {
    const now = moment();
    // first render the form
    const wrapper = shallow(<ExpenseForm />);
    // now simulate call to SDP on date change with now arg
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);

});
test('should set calendar focus on change', () => {
    // const focused = { focused: true };
    const focused = true;
    // method expects object with property focused set to a certain value
    // console.log(focused);
    const wrapper = shallow(<ExpenseForm />);
    // note on focus method expects object passed in
    // wrapper.find('SingleDatePicker').prop('onFocusChange')(focused);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: focused});
    // shortened to - since property and variable have the same name
    // wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    // expect(wrapper.state('calendarFocused')).toEqual(focused.focused);
    expect(wrapper.state('calendarFocused')).toEqual(focused);
})