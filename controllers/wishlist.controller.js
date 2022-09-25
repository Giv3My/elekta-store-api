const WishlistModel = require('../models/Wishlist.model');
const WishlistDto = require('../dtos/Wishlist.dto');

const getWishlist = async (req, res) => {
  const { userId } = res.locals;

  const wishlist = await WishlistModel.findOne({ user_id: userId });

  return res.status(200).json(WishlistDto(wishlist));

  // const wishlist = await WishlistModel.findOne({ user_id: userId }).populate({
  //   path: 'wishlist',
  //   populate: {
  //     path: 'goods',
  //     select: [
  //       'id',
  //       'img',
  //       'title',
  //       'category_id',
  //       'price',
  //       'state',
  //       'rating_stars',
  //       'reviews',
  //     ],
  //   },
  // });
};

const setWishlist = async (req, res) => {
  const { wishlist } = req.body;
  const { userId } = res.locals;

  await WishlistModel.findOneAndUpdate({ user_id: userId }, { $set: { wishlist } });

  return res.sendStatus(200);
};

module.exports = { getWishlist, setWishlist };
