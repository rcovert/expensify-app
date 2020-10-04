import { createStore, combineReducers } from "redux";
import uuid from "uuid";
// combine reducers allows to chain reducers to impact state

//ADD_EXPENSE - action generator - function returns implicit object
// note use of destructoring operation - pulling items from object and creating variables
const addExpense = ({ description = '', notes = '', amount = 0, createdAt = 0 } = {}) => ({
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
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})
//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
//SET_TEXT_FILTER
// set text filter to empty string if none provided
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
//SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
})
//SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
})
const expensesReducerDefaultState = [];
// Expenses reducer -- note use of ... spread operator to add to state
const expensesReducer = (state = expensesReducerDefaultState, action) => {
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
// filters reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                // spread the state object then override text from the action
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }

};

// get visible expenses
// destructure filters to get individual variables
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        // convert text match source and target to lower case
        // and check includes for filter
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
        // note - sort is tacked onto return results from filter which is an array 
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            // if a is greater than b, then a comes first
            return a.amount < b.amount ? 1 : -1
        }

    })
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    // demo state has expenses array and filters object
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));
// console.log(expenseOne);

// // now remove expense
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// // now edit expense
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// // now dispatch filter text request
//store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

// // sort by amount and date
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// start and end date
// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

// define state 
const demoState = {
    expenses: [{
        id: 'test',
        description: 'jan rent',
        notes: 'random notes',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',  // date or amount
        startDate: undefined,
        endDate: undefined
    }
}


