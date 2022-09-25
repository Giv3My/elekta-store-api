const router = require('express').Router();
const cartController = require('../../controllers/cart.controller');

router.get('/', cartController.getCart);
router.post('/', cartController.setCart);

module.exports = router;
