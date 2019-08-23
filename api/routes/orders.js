const express = require('express');
const router = express.Router();

router.post('/', (request, response) => {
 response.status(200).json({
   message: 'Handling POST requests to /orders'
 });
});

router.get('/', (request, response) => {
 response.status(200).json({
   message: 'Handling GET requests to /orders'
 });
});

router.get('/:orderId', (request, response) => {
 const id = request.params.orderId;
 response.status(200).json({
   message: `Order with ID = ${id} was fetched`
 });
});

router.patch('/:orderId', (request, response) => {
 const id = request.params.orderId;
 response.status(200).json({
   message: `Order with ID = ${id} was updated`
 });
});

router.delete('/:orderId', (request, response) => {
 const id = request.params.orderId;
 response.status(200).json({
   message: `Order with ID = ${id} was deleted`
 });
});

module.exports = router;