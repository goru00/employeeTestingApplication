const Router = require('express');
const router = new Router();

const authRouter = require('./auth.routes');
const universityRouter = require('./university.router');
const sectionRouter = require('./section.routes');
const testRouter = require('./test.routes');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.use('/auth', authRouter);
router.use('/university', universityRouter);
router.use('/tests', testRouter);

module.exports = router;