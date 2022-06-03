const Router = require('express');
const router = new Router();

const AuthMiddleware = require('../middlewares/auth.middlewares/auth.middleware');

const authRouter = require('./auth.routes/auth.router');
const userRoutes = require('./user.routes/index');
const universityRoutes = require('./university.routes/university.router');
const testRoutes = require('./test.routes/index');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.use('/users', [
    AuthMiddleware.verifyToken,
    AuthMiddleware.isActivatedAccount
], userRoutes);
router.use('/auth', authRouter);
router.use('/university', universityRoutes);
router.use('/tests', [
    AuthMiddleware.verifyToken,
    AuthMiddleware.isModeratorOrAdmin
], testRoutes);

module.exports = router;