const Router = require('express');
const router = new Router();

const StudentController = require('../../controllers/university.controllers/student.controller');

const StudentMiddleware = require('../../middlewares/university.middlewares/student.middleware');
const InvolvedMiddleware = require('../../middlewares/university.middlewares/involved.middleware');

router.post('/', [
    StudentMiddleware.checkExistsTabNum,
    InvolvedMiddleware.checkExistsInvolved
], StudentController.createStudent);

module.exports = router;