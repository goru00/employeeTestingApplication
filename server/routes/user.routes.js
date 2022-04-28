const UserController = require('../controllers/user.controller');
const Router = require('express');
const router = new Router();
const { body } = require('express-validator');

const Auth = require('../middlewares/auth');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/', [
    Auth.isAdmin
], UserController.getUsers);

router.get('/:userId', [
    Auth.isAdmin
], UserController.getUsers);

module.exports = router;