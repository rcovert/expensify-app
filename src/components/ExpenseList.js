import React from 'react';
import { connect, Connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// note have to export this component for testing -- in addition to the
// default connected export below
export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No Expense Items</span></div>
                ) : (
                        props.expenses.map((expense) => (
                            <ExpenseListItem key={expense.id} {...expense} />
                        ))
                    )
            }
        </div>
    </div>
)

const mapStateToProps = (state) => {
    // pass the expenses array as a prop/expenses to the expense list
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

// connect returns a function that then is called with ExpenseList to connect the
// component to the store
export default connect(mapStateToProps)(ExpenseList);
