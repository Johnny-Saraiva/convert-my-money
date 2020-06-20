const convert = (exexchangeRate, amount) => {
  return exexchangeRate * amount;
}

const toMoney = valor => {
  return parseFloat(valor).toFixed(2);
}

module.exports = {
  convert,
  toMoney
}
