const ProductModel = require('../models/Product.model');

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findOne({ _id: id });

    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).send('Product was not found');
  }
};

const getSimilarProducts = async (req, res) => {
  const { category_id } = req.params;

  const products = await ProductModel.aggregate([
    { $match: { category_id: category_id } },
  ]).sample(8);

  return res.status(200).json(products);
};

module.exports = { getProduct, getSimilarProducts };
