const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '96h',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '168h',
  });

  return { accessToken, refreshToken };
};

const validateAccessToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return user;
  } catch (e) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    return user;
  } catch (e) {
    return null;
  }
};

module.exports = { generateTokens, validateAccessToken, validateRefreshToken };
