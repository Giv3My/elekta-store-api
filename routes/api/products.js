const router = require('express').Router();
const productsController = require('../../controllers/products.controller');

router.get('/:id', productsController.getProduct);
router.get('/similar/:category_id', productsController.getSimilarProducts);

module.exports = router;
