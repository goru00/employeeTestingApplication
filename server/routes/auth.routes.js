const Auth = require('../middlewares/auth');
const UserController = require('../controllers/auth.controller');
const Router = require('express');
const router = new Router();
const { body } = require('express-validator');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// переписать валидацию
router.post('/signup', [
    body('email').isEmail(),
    body('password').isLength({
        min: 8,
        max: 16
    }),
    body('username').isLength({
        min: 8,
        max: 16
    }),
    body('roles').isArray({
        min: 1,
        max: 3
    }),
    Auth.checkDuplicateUsernameOrEmail,
    Auth.checkRolesExisted
], UserController.signup);
router.post('/signin', UserController.signin);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);
router.get('/activate/:link', UserController.activate);

module.exports = router;