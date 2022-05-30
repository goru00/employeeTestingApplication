const Router = require('express');
const router = new Router();

const TeacherController = require('../../controllers/university.controllers/teacher.controller');

router.get('/', TeacherController.getTeachers);
router.get('/:cathedraId', TeacherController.getTeachersOfTheCathedra);
router.post('/:cathedraId', TeacherController.createTeacherOfTheCathedra);

module.exports = router;