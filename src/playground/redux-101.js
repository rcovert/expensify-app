import { createStore } from "redux";

// object spread
const theUser = {
    name: 'jen',
    age: 26
};

console.log({
    ...theUser});

// Action generators
// note use of default object to payload in case it is not passed in
// note use of destructuring in syntax and use of default = 1 if no value is passed
// default to empty object {}
// note shorthand syntax when variable name and param have the same name 
// instead of incrementBy: incrementBy -- just use incrementBy
// incrementBy is part of the object sent to the function, so can be destructured into
// a variable of the same name
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy 
})
const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy 
})
const resetCount = () => ({
    type: 'RESET'
})
const setCount = ({count = 1} = {}) => ({
    type: 'SET',
    count
})

// reducers are the code that acutally change the state of the store
// 1. reducres are pure functions
// 2. never change state or action
const countReducer = ((state = { count: 0 }, action) => {
    // use switch
    switch (action.type) {
        case 'INCREMENT':
            //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            // return the state object
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            // note use of object property
            //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            // return the state object
            return {
                count: 0
            }
        case 'SET':
            // return the state object
            return {
                count: action.count
            }
        default:
            return state;
    }
});

// create store gets a function passed in to init
const store = createStore(countReducer);

// store.subsribe to watch for state changes
// note method to unsubscribe is just a call to the function
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

// increment action - note upper case convention
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

// use action object generator
store.dispatch(incrementCount({incrementBy: 5}));

// note unsubscribe
// unsubscribe();

// decrement action - note upper case convention
// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });
// store.dispatch({
//     type: 'DECREMENT'
// });
store.dispatch(decrementCount());

store.dispatch(decrementCount ({decrementBy: 10}));

// reset action - note upper case convention
// store.dispatch({
//     type: 'RESET'
// });
store.dispatch(resetCount());

// set action - note upper case convention
// store.dispatch({
//     type: 'SET',
//     count: 101
// });
store.dispatch(setCount({count: 4321}));
