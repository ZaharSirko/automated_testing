import * as until from './sample.js';

describe('Test 3 functiuons: lastIndexOfArray, isArray, getFullYear', () => {
    test('lastIndexOfArray', () => {
        expect(until.lastIndexOfArray([1, 2, 3, 2], 2)).toBe(3);
        expect(until.lastIndexOfArray([1, 2, 3], 4)).toBe(-1);
        expect(until.lastIndexOfArray([1, 2, 3], 2)).toBe(1);
    });
    test('isArray', () => {
        expect(until.isArrayc([1, 2, 3])).toBe(true);
        expect(until.isArrayc('123')).toBe(false);
        expect(until.isArrayc({})).toBe(false);
        expect(until.isArrayc(null)).toBe(false);
    });
    test('getFullYear', () => {
        expect(until.getFullYear(new Date(2020, 1, 1))).toBe(2020);
        expect(until.getFullYear(new Date(2021, 1, 1))).toBe(2021);
        expect(until.getFullYear(new Date(2022, 1, 1))).toBe(2022);
    });
});
