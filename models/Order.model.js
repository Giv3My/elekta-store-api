const { Schema, model } = require('mongoose');

const OrderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    order: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

module.exports = model('Order', OrderSchema);
