const expensesReducerDefaultState = [];
// Expenses reducer -- note use of ... spread operator to add to state
// note removal of const when defining this as the export default
export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':  // use state.filter to get a new array back
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':  // use state.map to get a new array back
            // note individual items are expense
            return state.map((expense) => {
                if (expense.id === action.id) {
                    // note use of object spread and override syntax ...,...
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                };
            });
        default:
            return state;
    }
};

