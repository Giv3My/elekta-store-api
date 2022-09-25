const tokenService = require('../services/token.service');

const authRequired = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('No access token');
  }

  token = token.split(' ')[1];

  const user = tokenService.validateAccessToken(token);

  if (!user) {
    return res.status(401).send('Access token has been expired');
  }

  res.locals.token = token;
  res.locals.userId = user.id;

  next();
};

module.exports = authRequired;
