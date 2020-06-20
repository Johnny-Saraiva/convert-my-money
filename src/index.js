const express = require('express');
const app = express();
const path = require('path');

const exchangeTo = require('./utils/convert');
const apiBCB = require('./utils/api.bcb');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (request, response) => {
  const exchangeRate = await apiBCB.getCotacao();
  response.render('home', {
    exchangeRate
  });
});

app.get('/exchange', (request, response) => {
  const { exchange, amount } = request.query;
  if (exchange < 0 | amount < 0) {
    response.render('exchange', {
      error: 'Wrong values, please do again.'
    });
  } else {
    const conversion = exchangeTo.convert(exchange, amount);
    response.render('exchange', {
      error: false,
      exchange,
      amount: exchangeTo.toMoney(amount),
      conversion: exchangeTo.toMoney(conversion),
    });
  }
});

app.listen(3000, err => {
  if (err) {
    console.log('Internal server error!');
  } else {
    console.log('🚀 ConvertMyMoney is running...')
  }
});
