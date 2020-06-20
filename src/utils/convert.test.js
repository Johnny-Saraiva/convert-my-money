const convert = require('./convert');

it('should be able to convert a normal number', () => {
  expect(convert.convert(2,4)).toBe(8);
});

it('should be able to convert a 0 number', () => {
  expect(convert.convert(0,4)).toBe(0);
});

it('should be able to toMoney convert to float', () => {
  expect(convert.toMoney(2)).toBe("2.00");
});

it('should be able to toMoney convert string values', () => {
  expect(convert.toMoney("2")).toBe("2.00");
});
