const Router = require('express');
const router = new Router();

const cathedraRouter = require('./cathedra.router');
const directionRouter = require('./direction.router');
const groupRouter = require('./group.router');
const disciplineRouter = require('./discipline.router');

router.use('/cathedras', cathedraRouter);
router.use('/directions', directionRouter);
router.use('/groups', groupRouter);
router.use('/disciplines', disciplineRouter);

module.exports = router;