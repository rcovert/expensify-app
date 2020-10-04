import React from "react";
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';

// note props are passed in from connected object 

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        // now dispath redux action console.log(expense);
        // now route back to the dashboard with history.push method from router/route
        // props.dispatch(addExpense(expense));
        // use this.props for class based components - not required on stateless functional components
        this.props.addExpense(expense);
        this.props.history.push('/');
    };
    render() {
        // note - this form of the code avoids writing function in-line
        // which prevents recalculation of function on every render
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    };
};

// stateless functional version
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             onSubmit={(expense) => {
//                 props.onSubmit(expense);
//                 props.history.push('/');
//             }}
//         />
//     </div>
// );

// mapDispatchToProps is used to simplify code and make it easier for testing
const mapDispatchToProps = (dispatch) => ({
    // implicit return of object -- no need for return statement
    addExpense: (expense) => dispatch(addExpense(expense))
});
// mapStateToProps is first arg; mapDispatchToProps is 2nd arg
export default connect(undefined, mapDispatchToProps)(AddExpensePage);