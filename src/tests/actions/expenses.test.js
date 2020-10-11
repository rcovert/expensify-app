import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

// create test data 
beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({ id, description, amount, note, createdAt }) => {
        expenseData[id] = { description, amount, note, createdAt };
    });
    database.ref('expenses').set(expenseData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should remove expense data from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    // note use of then to chain promises from the action
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        // now add second promise and assertion for database update check
        return database.ref(`expenses/${id}`).once('value');
        // the results of this promise are passed to the next then
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy;
        done();
    }).catch((e) => {
        console.log('test error: ', e);
    });  
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

test('should add expense to database and store with default values', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    // note use of then to chain promises from the action
    store.dispatch(startAddExpense(expenseDefaults)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        // now add second promise and assertion for database update check
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        // the results of this promise are passed to the next then
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    }).catch((e) => {
        console.log('test error: ', e);
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expense data from firebase', (done) => {
    const store = createMockStore({});
    // create empty mock store
    // dispatch the start set expenses action
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        // get the actions from the store 
        // and compare results
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});



