// authentication reducer
export default (state = {}, action) => {
    // note reducer function takes two arguments
    // initial state and action
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};