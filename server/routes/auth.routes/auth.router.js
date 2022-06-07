const AuthMiddleware = require('../../middlewares/auth.middlewares/auth.middleware');
const AuthController = require('../../controllers/auth.controllers/auth.controller');
const Router = require('express');
const router = new Router();

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
], AuthController.refresh);
router.get('/activate/:link', AuthController.activate);
router.get('/roles', [
    AuthMiddleware.verifyToken,
    AuthMiddleware.isAdmin
], AuthController.getRoles);

module.exports = router;