const express = require('express');
const checkAuth = require('../utils/checkauth')
const notFound = require("../utils/notfound");
const router = express.Router();

let db = {};
let sequence = 0;

router.post('/', checkAuth, (request, response) => {
  const newOrder = {
    id: ++sequence,
    orderId: request.body.orderId,
    customerId: request.body.customerId,
    receiverName: request.body.receiverName,
    receiverCpf: request.body.receiverCpf,
    isBuyer: request.body.isBuyer || false,
    dateTimeDelivery: request.body.dateTimeDelivery,
    local: request.body.local
  }

  db[newOrder.id] = newOrder;

  response.status(200).json(newOrder);
});

router.get('/', (request, response) => {
  const toArray = key => db[key];
  const orders = Object.keys(db).map(toArray);

  orders.length
  ? response.json(orders)
  : response.status(204).send();
});

router.get('/:orderId', (request, response) => {
  const order = db[request.params.orderId];
  order
  ? response.json(order)
  : notFound(request, response)
});

router.patch('/:orderId', checkAuth, (request, response) => {
  const order = db[request.params.orderId];
  const hasValue = request.body.isBuyer != null;
  if (order) {
    order.orderId = request.body.orderId || order.orderId;
    order.customerId = request.body.customerId || order.customerId;
    order.receiverName = request.body.receiverName || order.receiverName;
    order.receiverCpf = request.body.receiverCpf || order.receiverCpf;
    order.isBuyer = hasValue ? request.body.isBuyer : order.isBuyer;
    order.dateTimeDelivery = request.body.dateTimeDelivery || order.dateTimeDelivery;
    order.local = request.body.local || order.local;
    response.json(order);
  } else {
    notFound(request, response);
  }
});

router.delete('/:orderId', checkAuth, (request, response) => {
  const order = db[request.params.orderId];
  if (order) {
    delete db[order.id];
    response.status(200). json({
      message:'Deleted'
    });
  } else {
    notFound(request, response);
  }
});

module.exports = router;