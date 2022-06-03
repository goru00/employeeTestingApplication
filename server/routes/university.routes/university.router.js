const Router = require('express');
const router = new Router();

// controllers

const cathedraController = require('../../controllers/university.controllers/cathedra.controller');
const directionController = require('../../controllers/university.controllers/direction.controller');
const teacherController = require('../../controllers/university.controllers/teacher.controller');
const groupController = require('../../controllers/university.controllers/group.controller');

// cathedra routes

router.post('/cathedras', cathedraController.createCathedra);

router.get('/cathedras', cathedraController.getCathedras);

router.get('/cathedras/:id', cathedraController.getCathedras);

// direction routes

router.post('/cathedras/:cathedraId/directions', directionController.createDirection);

router.get('/cathedras/:cathedraId/directions', directionController.getDirectionsByCathedra);

router.get('/cathedras/:cathedraId/directions/:directionId', directionController.getDirection);

// teacher routes

router.post('/cathedras/:cathedraId/teachers', teacherController.createTeacherOfTheCathedra);

router.get('/teachers', teacherController.getTeachers);

router.get('/cathedras/:cathedraId/teachers', teacherController.getTeachersOfTheCathedra);

// group routes 

router.post('/cathedras/:cathedraId/directions/:directionId/groups', groupController.createGroup);
router.get('/cathedras/:cathedraId/directions/:directionId/groups', groupController.getGroups);

module.exports = router;