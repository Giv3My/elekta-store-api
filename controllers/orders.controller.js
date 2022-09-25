const CartModel = require('../models/Cart.model');
const UserModel = require('../models/User.model');
const orderService = require('../services/order.service');
const mailService = require('../services/mail.service');
const UserDto = require('../dtos/User.dto');
const initialCart = require('../utils/initialCart');

const checkout = async (req, res) => {
  const { order } = req.body;
  const { userId } = res.locals;

  req.session.cart = initialCart;

  const newOrder = await orderService.checkout(order, userId);

  mailService.sendEmail({ ...order, id: newOrder._id });

  if (userId) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { contacts: order.contacts },
      },
      { new: true }
    );
    await CartModel.findOneAndUpdate(
      { user_id: userId },
      { $set: { cart: initialCart } }
    );

    return res.status(200).json(UserDto(user));
  }

  return res.sendStatus(200);
};

module.exports = { checkout };
