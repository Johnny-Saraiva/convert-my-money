const express = require('express');
const app = express();
const path = require('path');
const exchangeTo = require('./utils/convert');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/exchange', (request, response) => {
  const { exchange, amount } = request.query;
  if (exchange && amount) {
    const conversion = exchangeTo.convert(exchange, amount);
    response.render('exchange', {
      exchange: exchangeTo.toMoney(exchange),
      amount: exchangeTo.toMoney(amount),
      conversion: exchangeTo.toMoney(conversion)
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
