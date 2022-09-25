const OrderModel = require('../models/Order.model');

const checkout = async (order, userId) => {
  const newOrder = await OrderModel.create({ user_id: userId ? userId : null, order });

  return newOrder;
};

module.exports = { checkout };
