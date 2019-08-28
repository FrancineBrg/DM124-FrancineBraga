const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/deliveries', require('./api/routes/deliveries'));
app.use(require('./api/utils/notfound'));

module.exports = app;