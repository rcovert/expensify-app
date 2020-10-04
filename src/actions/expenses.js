import uuid from "uuid";

//ADD_EXPENSE - action generator - function returns implicit object
// note use of destructoring operation - pulling items from object and creating variables
export const addExpense = ({ description = '', notes = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        notes,
        amount,
        createdAt
    }
})
//REMOVE_EXPENSE
// set action generator = function that implicitly returns a function
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})
//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});