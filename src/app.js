// now import react and react-dom as npm mods
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, editExpense, removeExpense } from './actions/expenses';
import { setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore(); // get the store

console.log(store.getState());

store.subscribe(() => {
    const state = store.getState();
    // demo state has expenses array and filters object
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

// now generate some transactions
store.dispatch(addExpense({ description: 'Water Bill', amount: 4500, createdAt: -21000 }));
store.dispatch(addExpense({ description: 'Gas Bill', amount: 300, createdAt: 2000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 1000 }));

// now render to the screen
const jsx = (
    // note use of provider component
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// timeout to 3 secs
// note changes to store show up automatically
// setTimeout takes a funtion and a timeout time as args
// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000);

ReactDOM.render( jsx, document.getElementById('app'));


