const CartModel = require('../models/Cart.model');
const CartDto = require('../dtos/Cart.dto');

const getCart = async (session, userId) => {
  const user = await CartModel.findOne({ user_id: userId });

  if (user.cart.quantity) {
    session.cart = CartDto(user);
  } else {
    user.cart = session.cart;
    user.save();
  }

  return CartDto(user);
};

const setCart = async (cart, userId) => {
  const user = await CartModel.findOne({ user_id: userId });

  user.cart = cart;
  user.save();
};

module.exports = { getCart, setCart };
