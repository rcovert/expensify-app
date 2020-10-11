import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

// create test data 
// beforeEach((done) => {
//     const expenseData = {};
//     expenses.forEach(({ id, description, amount, note, createdAt }) =>{
//         expenseData[id] = { description, amount, note, createdAt };
//     });
//     database.ref('expenses').set(expenseData).then(() => done());
// });

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});
test('should note remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '6'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '6',
            description: 'candy',
            amount: 1090,
            note: '',
            createdAt: moment(0)
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '1',
        updates: { note: 'new note', amount: '123.45' }
    }
    const state = expensesReducer(expenses, action);
    expect(state[0].note).toBe('new note');
});
test('should not edit expense if expense not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '7',
        updates: { note: 'new note', amount: '123.45' }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});