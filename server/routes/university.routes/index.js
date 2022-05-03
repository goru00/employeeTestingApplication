const Router = require('express');
const router = new Router();

const cathedraRouter = require('./cathedra.router');
const directionRouter = require('./direction.router');
const groupRouter = require('./group.router');
const disciplineRouter = require('./discipline.router');
const teacherRouter = require('./teacher.router');
const studentRouter = require('./student.router');

router.use('/cathedras', cathedraRouter);
router.use('/directions', directionRouter);
router.use('/groups', groupRouter);
router.use('/disciplines', disciplineRouter);
router.use('/teachers', teacherRouter);
router.use('/students', studentRouter);

module.exports = router;