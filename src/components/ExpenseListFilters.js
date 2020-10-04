import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

// note: connected objects have direct access to, dispatch function through props
// e is the event on the input line and has access to what user types
export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }
    onFocusChange = (calendarFocused) => {
        // updater function wraps an object in parent
        this.setState(() => ({ calendarFocused }));
    }
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }
    onFilterChange = (e) => {
        e.target.value === 'date' ?
            this.props.sortByDate() :
            this.props.sortByAmount()
    }
    render() {
        return (
            <div>
                <input type='text' value={this.props.filters.text} onChange={this.onTextChange} />
                <select value={this.props.filters.sortBy}
                    onChange={this.onFilterChange}>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select >
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    showClearDates={true}
                    isOutsideRange={() => false}
                />

            </div >
        );
    };
};

const mapStateToProps = (state) => ({
    // returning an object - so need {} notation
        filters: state.filters
});

const mapDispatchToProps = (dipatch) => ({
    // composed of an object containing arrow functions assigned to actions
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate),
    sortByAmount: () => dispatch(sortByAmount),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);