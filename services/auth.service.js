const bcrypt = require('bcrypt');

const UserModel = require('../models/User.model');
const CartModel = require('../models/Cart.model');
const WishlistModel = require('../models/Wishlist.model');
const tokenService = require('./token.service');
const UserDto = require('../dtos/User.dto');
const initialCart = require('../utils/initialCart');

const registration = async (user) => {
  const candidate = await UserModel.findOne({
    $and: [{ email: user.email }, { username: user.username }],
  });

  if (candidate) {
    throw new Error('Incorrect email and username');
  }

  const existEmail = await UserModel.findOne({ email: user.email });

  if (existEmail) {
    throw new Error('Incorrect email');
  }

  const existUsername = await UserModel.findOne({ username: user.username });

  if (existUsername) {
    throw new Error('Incorrect username');
  }

  const hashedPassword = await bcrypt.hash(user.password, 5);

  const newUser = await UserModel.create({ ...user, password: hashedPassword });
  await CartModel.create({ user_id: newUser._id, cart: initialCart });
  await WishlistModel.create({ user_id: newUser._id });

  const userDto = UserDto(newUser);

  const tokens = tokenService.generateTokens({
    id: newUser._id,
    email: newUser.email,
    password: newUser.password,
  });

  return { user: userDto, ...tokens };
};

const login = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error(`Incorrect email`);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error(`Incorrect password`);
  }

  const tokens = tokenService.generateTokens({
    id: user._id,
    email: user.email,
    password: user.password,
  });

  const userDto = UserDto(user);

  return {
    user: userDto,
    ...tokens,
  };
};

const refreshTokens = (token) => {
  const user = tokenService.validateRefreshToken(token);

  if (!user) {
    return null;
  }

  const tokens = tokenService.generateTokens({
    id: user.id,
    email: user.email,
    password: user.password,
  });

  return tokens;
};

module.exports = { registration, login, refreshTokens };
