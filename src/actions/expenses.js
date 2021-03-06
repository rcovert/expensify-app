import uuid from "uuid";
import database from '../firebase/firebase';

// component calls action generator
// action generator returns object
// component dispatches object
// redux stores changes
//
// now change to
// component calls action generator
// action generatr returns function
// component dispatches function with redux middleware
// function runs - has the ability to dispath other actions etc...

//ADD_EXPENSE - action generator - function returns implicit object
// note use of destructoring operation - pulling items from object and creating variables
// export const addExpense = ({
//     description = '',
//     notes = '',
//     amount = 0,
//     createdAt = 0
// } = {})
//     => ({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: uuid(),
//             description,
//             notes,
//             amount,
//             createdAt
//         }
//     });
// simplified based on asynch function call below with thunk
// ADD_EXPENSE
// add asynch action -- passing function only works with thunk middleware
// note expenseData = {} sets {} as empty default
// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        // get the uid of user from the current state
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database.ref(`users/${uid}/expenses`)
        .push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
// set action generator = function that implicitly returns a function
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// start remove expense
export const startRemoveExpense = ({ id }) => {
    return (dispatch, getState) => {
        // remove the data from db then from the store
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`)
            .remove()
            .then(() => {
                // console.log(`item ${id} is removed`)
                // now set redux with the information
                // note remove takes an object id: id are the same so { id }
                dispatch(removeExpense({ id }));
            });
    };
};
//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
// start edit expense
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        // first synch firebase with update
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            // then update redux
            dispatch(editExpense(id, updates));
        });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// start set expenses - to get data from database
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        // retrieve the data from the database - note this return 
        // returns the promise that can then be used by caller - i.e. the then clause
        // in app.js for this call
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`)
            .once('value')
            .then((snapshot) => {
                //console.log(snapshot.val())
                const expenses = [];
                // snapshot for each returns child snapshot/indv objects
                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                // now set redux with the information
                dispatch(setExpenses(expenses));
            });
    };
};

