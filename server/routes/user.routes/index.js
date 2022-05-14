const Router = require('express');
const router = new Router();

const userRouter = require('./user.router');

router.use('/', userRouter);

module.exports = router;