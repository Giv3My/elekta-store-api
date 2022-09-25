const { Schema, model } = require('mongoose');

const WishlistSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    wishlist: {
      goods: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        default: [],
      },
      quantity: { type: Number, default: 0, required: true },
    },
  },
  { collection: 'wishlist' }
);

module.exports = model('Wishlist', WishlistSchema);
