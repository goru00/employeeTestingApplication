const Router = require('express');
const router = new Router();

const sectionRouter = require('./section.router');
const testRouter = require('./test.router');

router.use('/sections', sectionRouter);
router.use('/', testRouter);

module.exports = router;