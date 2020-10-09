import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should setup edit expense action object', () => {
    // takes id and updates object as parms
    const action = editExpense('123abc', { note: 'new note', amount: '123.45' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { note: 'new note', amount: '123.45' }
    })
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// done forces jest to wait until we call done for
// asynch testing
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is betters',
        createdAt: 1000
    };
    // note use of then to chain promises from the action
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        // now add second promise and assertion for database update check
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        // the results of this promise are passed to the next then
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    }).catch((e) => {
        console.log('test error: ', e);
    });
});


test('should add expense to database and store with default values', () => {
    const store = createMockStore({});
    const expenseData = '';
    // note use of then to chain promises from the action
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        // now add second promise and assertion for database update check
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        // the results of this promise are passed to the next then
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    }).catch((e) => {
        console.log('test error: ', e);
    });
});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description:'',
//             amount: 0,
//             createdAt: 0,
//             notes: '',
//             id: expect.any(String)
//         }
//     })
// });