const CategoryModel = require('../models/Category.model');
const ProductModel = require('../models/Product.model');

const populateWithIds = async () => {
  const categories = await CategoryModel.find();

  if (categories[0].products[0].length > 4) {
    return console.log('Products have been already populated');
  }

  categories.forEach(async (category) => {
    const products = (await ProductModel.find({ id: { $in: category.products } })).map(
      (product) => product._id
    );

    await ProductModel.updateMany(
      { id: { $in: category.products } },
      { $set: { category_id: category._id } }
    );

    await CategoryModel.findOneAndUpdate({ id: category.id }, { products });
  });

  return console.log('Populating successully finished');
};

const seeding = async () => {
  const categories = require('../data/categories.json');
  const products = require('../data/goods.json');

  const categoriesExist = await CategoryModel.find();

  if (categoriesExist.length) {
    return console.log('Products have been already seeded');
  }

  await CategoryModel.insertMany(categories);
  await ProductModel.insertMany(products);

  await populateWithIds();
};

module.exports = seeding;
