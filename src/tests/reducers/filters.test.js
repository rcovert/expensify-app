import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer( undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to amount', () => {
    const state = filtersReducer( undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toEqual('amount');
})

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
    }
    const action = { type: 'SORT_BY_DATE' }
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toEqual('date');
});
test('should set text filter', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
    }
    const action = { type: 'SET_TEXT_FILTER', text: 'e' }
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('e');
});
test('should set start date filter', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined
    }
    const action = { type: 'SET_START_DATE', startDate: moment(0) }
    const state = filtersReducer(currentState, action);
    expect(state.startDate).toEqual(moment(0));
})
test('should set end date filter', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined
    }
    const action = { type: 'SET_END_DATE', endDate: moment(0) }
    const state = filtersReducer(currentState, action);
    expect(state.endDate).toEqual(moment(0));
})