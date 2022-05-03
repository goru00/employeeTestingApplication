const Router = require('express');
const router = new Router();

const TeacherController = require('../../controllers/university.controllers/teacher.controller');

const TeacherMiddleware = require('../../middlewares/university.middlewares/teacher.middleware');
const InvolvedMiddleware = require('../../middlewares/university.middlewares/involved.middleware');

router.post('/', [
    TeacherMiddleware.checkExistsTabNum,
    InvolvedMiddleware.checkExistsInvolved
], TeacherController.createTeacher);

module.exports = router;