const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  id: { type: String },
  title: { type: String },
  products: [{ type: Schema.Types.String, ref: 'Product' }],
});

module.exports = model('Category', CategorySchema);
