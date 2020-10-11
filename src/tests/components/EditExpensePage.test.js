import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, startRemoveExpense, history, wrapper;

// before each sets common globals for each test case in the file
beforeEach(() => {
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
      <EditExpensePage
        editExpense={editExpense}
        startRemoveExpense={startRemoveExpense}
        history={history}
        expense={expenses[1]}
      />
    );
  });
// should render
test('should render edit expense page correctly', () =>{
    // setup spies for required function inputs
    expect(wrapper).toMatchSnapshot();
});

// should handle edit with spies
test('should handle onSubmit for edit', () => {
    // find the function we want to test and pass fixture data
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

// should handle remove expense
test('should handle removeExpense for edit', () => {
    // find the function we want to test and pass fixture data
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[1].id});
});