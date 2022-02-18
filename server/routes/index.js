const Router = require('express');
const router = new Router();

const authRouter = require('./auth.routes');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.use('/auth', authRouter);

module.exports = router;