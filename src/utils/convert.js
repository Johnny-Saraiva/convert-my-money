const convert = (exexchangeRate, amount) => {
  return parseFloat(exexchangeRate) * parseFloat(amount);
}

const toMoney = valor => {
  return parseFloat(valor).toFixed(2);
}

module.exports = {
  convert,
  toMoney
}
