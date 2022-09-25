const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  id: { type: String },
  img: { type: String },
  title: { type: String },
  category_id: { type: Schema.Types.String, ref: 'Category' },
  breadcrumbs: { type: [] },
  images: { type: [] },
  colors: { type: [] },
  details: [{ type: String }],
  price: { type: Schema.Types.Mixed },
  state: { type: String },
  rating_stars: { type: Number },
  reviews: { type: Number },
});

module.exports = model('Product', ProductSchema);
