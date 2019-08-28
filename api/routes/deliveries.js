const express = require('express');
const checkAuth = require('../utils/checkauth')
const notFound = require("../utils/notfound");
const router = express.Router();

let db = {};
let sequence = 0;

router.post('/', checkAuth, (request, response) => {
  const newDelivery = {
    id: ++sequence,
    orderId: request.body.orderId,
    customerId: request.body.customerId,
    receiverName: request.body.receiverName,
    receiverCpf: request.body.receiverCpf,
    isBuyer: request.body.isBuyer || false,
    dateTime: request.body.dateTime,
    local: request.body.local
  }

  db[newDelivery.id] = newDelivery;

  response.status(200).json(newDelivery);
});

router.get('/', (request, response) => {
  const toArray = key => db[key];
  const deliveries = Object.keys(db).map(toArray);

  deliveries.length
  ? response.json(deliveries)
  : response.status(204).send();
});

router.get('/:deliveryId', (request, response) => {
  const delivery = db[request.params.deliveryId];
  delivery
  ? response.json(delivery)
  : notFound(request, response)
});

router.patch('/:deliveryId', checkAuth, (request, response) => {
  const delivery = db[request.params.deliveryId];
  const hasValue = request.body.isBuyer != null;
  if (delivery) {
    delivery.orderId = request.body.orderId || delivery.orderId;
    delivery.customerId = request.body.customerId || delivery.customerId;
    delivery.receiverName = request.body.receiverName || delivery.receiverName;
    delivery.receiverCpf = request.body.receiverCpf || delivery.receiverCpf;
    delivery.isBuyer = hasValue ? request.body.isBuyer : delivery.isBuyer;
    delivery.dateTime = request.body.dateTime || delivery.dateTime;
    delivery.local = request.body.local || delivery.local;
    response.json(delivery);
  } else {
    notFound(request, response);
  }
});

router.delete('/:deliveryId', checkAuth, (request, response) => {
  const delivery = db[request.params.deliveryId];
  if (delivery) {
    delete db[delivery.id];
    response.status(200). json({
      message:'Deleted'
    });
  } else {
    notFound(request, response);
  }
});

module.exports = router;