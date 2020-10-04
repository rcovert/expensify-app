import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

// before each sets common globals for each test case in the file
beforeEach(() => {
    // setup spies for required function inputs
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('should render add expense page correctly', () =>{
    // setup spies for required function inputs
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    // find the function we want to test and pass fixture data
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});