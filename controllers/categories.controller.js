const CategoryModel = require('../models/Category.model');

const getCategories = async (req, res) => {
  const categoriesIds = (await CategoryModel.aggregate().sample(3)).map(
    (item) => item._id
  );

  const categories = await CategoryModel.find(
    {
      _id: { $in: categoriesIds },
    },
    { products: { $slice: -4 } }
  ).populate('products', [
    'id',
    'img',
    'title',
    'category_id',
    'colors',
    'price',
    'state',
    'rating_stars',
    'reviews',
  ]);

  return res.status(200).json(categories);
};

module.exports = { getCategories };
