const { Schema, model } = require('mongoose');

const CartSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cart: { type: Schema.Types.Mixed, required: true },
  },
  { collection: 'cart' }
);

module.exports = model('Cart', CartSchema);
