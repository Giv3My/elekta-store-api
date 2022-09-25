const authService = require('../services/auth.service');

const registration = async (req, res) => {
  try {
    const user = await authService.registration(req.body);

    res.header('Authorization', `Bearer ${user.accessToken}`);
    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await authService.login(req.body);

    res.header('Authorization', `Bearer ${user.accessToken}`);
    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const logout = async (req, res) => {
  res.clearCookie('refreshToken');

  return res.sendStatus(200);
};

const checkAuth = (req, res) => {
  const { token } = res.locals;

  res.header('Authorization', token);

  return res.sendStatus(200);
};

const refreshTokens = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).send('Refresh token has been expired');
  }

  const tokens = authService.refreshTokens(refreshToken);

  if (!tokens) {
    return res.status(401).send('Refresh token has been expired');
  }

  res.header('Authorization', tokens.accessToken);
  res.cookie('refreshToken', tokens.refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.status(200).json(tokens);
};

module.exports = { registration, login, logout, checkAuth, refreshTokens };
