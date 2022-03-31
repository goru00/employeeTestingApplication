const Auth = require('../middlewares/auth');
const authController = require('../controllers/auth.controller');
const Router = require('express');
const router = new Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/users/:id', [
    Auth.verifyToken
], authController.getUsers);

router.post('/signup', [
    Auth.checkDuplicateUsernameOrEmail,
    Auth.checkRolesExisted
], authController.signup);
router.post('/signin', authController.signin);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/activate/:link', authController.activate);

module.exports = router;