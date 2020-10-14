import authReducer from '../../reducers/auth';

// login 
test('should set uid correctly', () => {
    const action = {
        type: 'LOGIN',
        uid: 'abcdefg'
    }
    // be sure to call authReducer with all parms it is expecting, including 
    // empty state
    const state = authReducer({}, action);
    expect(state.uid).toEqual('abcdefg');
});

// logout
test('should perform logout correctly', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({}, action);
    expect(state.uid).toEqual(undefined);
})

