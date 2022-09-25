const router = require('express').Router();
const categories = require('./categories');
const products = require('./products');
const cart = require('./cart');
const wishlist = require('./wishlist');
const orders = require('./orders');

const authFree = require('../../middlewares/auth-free.middleware');
const authRequired = require('../../middlewares/auth-required.middleware');

router.use('/categories', categories);
router.use('/products', products);
router.use('/cart', authFree, cart);
router.use('/wishlist', authRequired, wishlist);
router.use('/orders', authFree, orders);

module.exports = router;
