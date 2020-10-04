import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const ExpenseListItem = ({ id, description, amount, createdAt }) => {

    return (
        // note: shorthand of id: id -> is just id
        <div>
            <Link
                to={`/edit/${id}`} >
                <h3>{description}</h3>
            </Link>
            <p>{amount} - {createdAt}</p>
        </div>
    );
};

export default ExpenseListItem;
