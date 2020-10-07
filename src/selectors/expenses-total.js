

export default (expenses) => {
    // // get total number of items in array
    // const expenseLen = expenses.length;
    // console.log(expenseLen);
    // // check if expenses array is empty and then return 0
    // if (!expenses) {
    //     return 0;
    // }
    // // else return result of reduct accumulator function
    // // reduce is called with accumulator var and current item
    // // passed to function (a+b), and initial value set to 0
    // const results = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    // return results;

    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => sum + value, 0);

}