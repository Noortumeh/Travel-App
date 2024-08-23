const {calculateRemainingDays} = require('../js/calculateRemainingDays');
const now = new Date();
const date2 = new Date("2024-8-29")
test('give me the remaining days from now to the date i will set at the parameter', () => {
    expect(calculateRemainingDays(now)).toBe(-0);
    expect(calculateRemainingDays(date2)).toBe(8);
});