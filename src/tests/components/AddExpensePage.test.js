import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

// before each sets common globals for each test case in the file
beforeEach(() => {
    // setup spies for required function inputs
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('should render add expense page correctly', () =>{
    // setup spies for required function inputs
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    // find the function we want to test and pass fixture data
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});