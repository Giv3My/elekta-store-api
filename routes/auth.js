const router = require('express').Router();
const authController = require('../controllers/auth.controller');

const authRequired = require('../middlewares/auth-required.middleware');

router.post('/signup', authController.registration);
router.post('/signin', authController.login);
router.post('/logout', authController.logout);
router.post('/', authRequired, authController.checkAuth);
router.get('/refresh', authController.refreshTokens);

module.exports = router;
