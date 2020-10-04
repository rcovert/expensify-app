import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />)
})

test('should render filters data correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render alt filters data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
})

// should handle text change
test('should handle text change', () => {
    const value = 'bi';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
})
// should sort by amount
test('should sort by amount', () => {
    const value = 'amount'
    wrapper.find('select').at(0).simulate('change', {
        target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();
});
// should sort by date
test('should sort by date', () => {
    const value = 'date'
    wrapper.find('select').at(0).simulate('change', {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled();
});
// should handle date changes
test('should handle date changes', () => {
    const startDate = moment();
    const endDate = moment().add(10, 'days');
    // called with object that has start and end dates set
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});
// should handle date focus change
test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
