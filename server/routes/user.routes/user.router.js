const UserController = require('../../controllers/user.controllers/user.controller');
const Router = require('express');
const router = new Router();

const AuthMiddleware = require('../../middlewares/auth.middlewares/auth.middleware');

router.get('/', [
    AuthMiddleware.isAdmin
], UserController.getUsers);

router.get('/:userId', [
    AuthMiddleware.isAdmin
], UserController.getUsers);

module.exports = router;