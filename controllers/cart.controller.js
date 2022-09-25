const cartService = require('../services/cart.service');
const initialCart = require('../utils/initialCart');

const getCart = async (req, res) => {
  const { userId } = res.locals;

  if (!req.session.cart) {
    req.session.cart = initialCart;
  }

  if (userId) {
    const cart = await cartService.getCart(req.session, userId);

    return res.status(200).json(cart);
  }

  return res.status(200).json(req.session.cart);
};

const setCart = async (req, res) => {
  const { cart } = req.body;
  const { userId } = res.locals;

  if (userId) {
    await cartService.setCart(cart, userId);
  }

  req.session.cart = cart;

  return res.sendStatus(200);
};

module.exports = { getCart, setCart };
