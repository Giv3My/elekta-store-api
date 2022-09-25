const router = require('express').Router();
const ordersController = require('../../controllers/orders.controller');

router.post('/checkout', ordersController.checkout);

module.exports = router;
