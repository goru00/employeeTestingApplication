const Router = require('express');
const router = new Router();

// controllers

const cathedraController = require('../../controllers/university.controllers/cathedra.controller');
const directionController = require('../../controllers/university.controllers/direction.controller');
const teacherController = require('../../controllers/university.controllers/teacher.controller');
const groupController = require('../../controllers/university.controllers/group.controller');
const studentController = require('../../controllers/university.controllers/student.controller');
const disciplineController = require('../../controllers/university.controllers/discipline.controller');

// cathedra routes

router.post('/cathedras', cathedraController.createCathedra);

router.get('/cathedras', cathedraController.getCathedras);

router.get('/cathedras/:id', cathedraController.getCathedras);

// direction routes

router.post('/cathedras/:cathedraId/directions', directionController.createDirection);

router.get('/cathedras/:cathedraId/directions', directionController.getDirectionsByCathedra);

router.get('/directions/:directionId', directionController.getDirection);

router.get('/directions', directionController.getDirections);

// teacher routes

router.post('/cathedras/:cathedraId/teachers', teacherController.createTeacherOfTheCathedra);

router.get('/teachers', teacherController.getTeachers);

router.get('/cathedras/:cathedraId/teachers', teacherController.getTeachersOfTheCathedra);

// group routes 

router.post('/directions/:directionId/groups', groupController.createGroup);

router.get('/groups', groupController.getGroups);

router.get('/directions/:directionId/groups', groupController.getGroupsOfTheDirection);

// student routes 

router.post('/groups/:groupId/students', studentController.createStudent);

router.get('/groups/:groupId/students', studentController.getStudentsOfTheGroup);

router.get('/students', studentController.getStudents);

// discipline routes

router.post('/disciplines', disciplineController.createDiscipline);

router.get('/disciplines', disciplineController.getDisciplines);

router.get('/groups/:groupId/disciplines', disciplineController.getDisciplinesOfTheGroup);

module.exports = router;