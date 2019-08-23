const express = require('express');
const app = express();

const orderRoutes = require('./api/routes/orders');
app.use('/api/orders', orderRoutes);

module.exports = app;