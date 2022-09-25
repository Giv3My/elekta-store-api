const router = require('express').Router();
const wishlistController = require('../../controllers/wishlist.controller');

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.setWishlist);

module.exports = router;
