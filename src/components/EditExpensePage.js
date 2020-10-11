import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { editExpense, startRemoveExpense } from '../actions/expenses';

// refactor to class based component
// setup mapDispatchToProps

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };
    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <h1>Edit Expense</h1>
                <p>The id is: {this.props.expense.id}</p>
                <ExpenseForm expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>
                    Remove</button>
            </div>
        )
    }
}

// const EditExpensePage = (props) => {
//     // console.log('the state at edit = ');
//     // console.log(props);
//     return (
//         <div>
//             <h1>Edit Expense</h1>
//             <p>The id is: {props.match.params.id}</p>
//             <ExpenseForm expense={props.expense}
//                 onSubmit={(expense) => {
//                     // now dispath redux action console.log(expense);
//                     // now route back to the dashboard with history.push method from router/route
//                     // console.log(expense.description);
//                     // console.log(props.match.params.id)
//                     props.dispatch(editExpense(props.match.params.id, expense));
//                     props.history.push('/');
//                 }}
//             />
//             <button onClick={() => {
//                 // console.log(props.match.params.id)
//                 // note that we are sending an object to remove expense
//                 props.dispatch(removeExpense({ id: props.match.params.id }))
//                 props.history.push('/');
//             }}>
//                 Remove</button>
//         </div>
//     )
// };

// this is where we need a map state to props function to get the expense with the right id
// which comes in on the match prop
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    // implicit return of object -- no need for return statement
    // edit expense is set to a function
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense))
});
// need to pass in mapStateToProps to connect to get the props set
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);