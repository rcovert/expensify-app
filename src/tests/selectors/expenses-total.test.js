import selectExpenseTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses'


test('should show zero when there are no expenses', () => {
    const total = selectExpenseTotal([]);
    // console.log(total);
    expect(total).toBe(0);
});

test('should show correct total when there is only one expense', () => {
    const total = selectExpenseTotal([expenses[0]]);
    // console.log(total);
    expect(total).toBe(195);
});

test('should show correct total of multiple expense items', () => {
    const total = selectExpenseTotal(expenses);
    // console.log(total);
    expect(total).toBe(114195);
});