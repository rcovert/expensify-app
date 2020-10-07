import React from 'react';
import { shallow } from 'enzyme';
// be sure to use {} for named exports
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

// not sure why this did not work
// test('should render ExpenseSummary with expenses', () => {
//     const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
//     expect(wrapper).toMatchSnapshot();
// });

// test('should render ExpenseSummary with no expeses', () => {
//     const wrapper = shallow(<ExpensesSummary expenses={[]} />);
//     expect(wrapper).toMatchSnapshot();
// });

// test('should render ExpenseSummary with just one expeses', () => {
//     const wrapper = shallow(<ExpensesSummary expenses={expenses[9]} />);
//     expect(wrapper).toMatchSnapshot();
// });

// note props match props in component map state to props
test('should correctly render ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={23512340987} />);
    expect(wrapper).toMatchSnapshot();
});


