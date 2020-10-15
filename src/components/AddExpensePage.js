import React from "react";
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

// note props are passed in from connected object 

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        // now dispath redux action console.log(expense);
        // now route back to the dashboard with history.push method from router/route
        // props.dispatch(addExpense(expense));
        // use this.props for class based components - not required on stateless functional components
        this.props.startAddExpense(expense);
        this.props.history.push('/dashboard');
    };
    render() {
        // note - this form of the code avoids writing function in-line
        // which prevents recalculation of function on every render
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    };
};

// mapDispatchToProps is used to simplify code and make it easier for testing
// note:  this is an arrow function and takes dispatch as an input arg
const mapDispatchToProps = (dispatch) => ({
    // implicit return of object -- no need for return statement
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});
// mapStateToProps is first arg; mapDispatchToProps is 2nd arg
export default connect(undefined, mapDispatchToProps)(AddExpensePage);