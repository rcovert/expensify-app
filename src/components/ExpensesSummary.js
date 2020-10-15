import React from 'react';
import { connect, Connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectTotalExpenses from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    return (
        <div className="page-header">
            <div className="content-container">

                <h1 className="page-header__title">Viewing <span> {expenseCount} </span> {expenseWord}, totaling:
                <span>{numeral(expensesTotal / 100).format(' $0,0.00')}</span></h1>

                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    // pass the expenses array as a prop/expenses to the expense list
    // setup visibleExpenses as viewed array
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    // create object with new props to display in jsx above
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectTotalExpenses(visibleExpenses)
    };
};

// connect returns a function that then is called with ExpenseList to connect the
// component to the store
export default connect(mapStateToProps)(ExpensesSummary);