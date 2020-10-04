import moment from 'moment';

const expenses = [{
    id: '1',
    description: 'gum',
    amount: 195,
    note: '',
    createdAt: 0
}, {
    id: '2',
    description: 'rent',
    amount: 109500,
    note: '',
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    amount: 4500,
    note: '',
    createdAt: moment(0).add(4, 'days').valueOf()
},];

export default expenses;