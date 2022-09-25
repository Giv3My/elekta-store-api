const tokenService = require('../services/token.service');

const authFree = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(' ')[1];

    const user = tokenService.validateAccessToken(token);

    if (user) {
      res.locals.userId = user.id;
    } else {
      res.locals.userId = null;
    }
  } else {
    res.locals.userId = null;
  }

  next();
};

module.exports = authFree;
