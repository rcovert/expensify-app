// now import react and react-dom as npm mods
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
// import './playground/promises';

const store = configureStore(); // get the store

store.subscribe(() => {
    const state = store.getState();
    // demo state has expenses array and filters object
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    //console.log(visibleExpenses);
})

// now render to the screen
const jsx = (
    // note use of provider component
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    //console.log('state changed');
    if (user) {
        // console.log('user id: ', user.uid);
        // now update store with uid of user - used to protect other pages
        store.dispatch(login(user.uid)); // this will create the action object
        // that gets processed by the auth reducer
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
        });
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
        // console.log('log in');
    } else {
        // console.log('log out');
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});

// // now generate some transactions
// store.dispatch(addExpense({ description: 'Water Bill', amount: 4500, createdAt: -21000 }));
// store.dispatch(addExpense({ description: 'Gas Bill', amount: 300, createdAt: 2000 }));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 1000 }));

// timeout to 3 secs
// note changes to store show up automatically
// setTimeout takes a funtion and a timeout time as args
// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000);





