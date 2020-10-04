// note use of require to get the actual moment lib for test to mock
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};