const AuthMiddleware = require('../../middlewares/auth.middlewares/auth.middleware');
const AuthController = require('../../controllers/auth.controllers/auth.controller');
const Router = require('express');
const router = new Router();

// переписать валидацию
router.post('/signup', [
    AuthMiddleware.checkDuplicateUsernameOrEmail,
    AuthMiddleware.checkRolesExisted,
], AuthController.signup);
router.post('/signin', [
    AuthMiddleware.validateAuth
], AuthController.signin);
router.post('/logout', AuthController.logout);
router.get('/refresh', [
    AuthMiddleware.verifyToken,
    AuthMiddleware.isActivatedAccount
], AuthController.refresh);
router.get('/activate/:link', AuthController.activate);

module.exports = router;