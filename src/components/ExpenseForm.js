import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// old way of date manipulation const date = new Date();
// const now = moment();  // returns now
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        // set values to existing expense values for edit
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: undefined
        };
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description: description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        // updater function (() => ({object}))
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        // validate amount
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        };
    };
    onDateChange = (createdAt) => {
        // check if there is a value - if not do nothing
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        // avoid full page refresh behavior 
        e.preventDefault();
        // perform validation on desc and amt
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please add a description and amount to the form.' }));
        } else {
            this.setState(() => ({ error: '' }));
            // now pass the valid data back to parent component for action dispatch
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    };

    // react class components must have render method
    // note use of form as root element for page
    // does not have to be a div
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type='text'
                    className="text_input"
                    placeholder='Description'
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type='text'
                    className="text_input"
                    placeholder='Amount'
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    placeholder='Add a note for your expense (optional)'
                    className="textarea"
                    value={this.state.note}
                    onChange={this.onNoteChange}>
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>

            </form>
        )
    }
};
