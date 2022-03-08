const Auth = require('../middlewares/auth');
const University = require('../middlewares/university');

const UniversityController = require('../controllers/university.controller');
const Router = require('express');
const router = new Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/cathedras', [
    Auth.verifyToken
], UniversityController.getCathedras);
router.post('/cathedras', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin,
    University.checkExistsCathedra
], UniversityController.createCathedra);

router.get('/directions', [
    Auth.verifyToken
], UniversityController.getDirections);
router.post('/directions', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin
], UniversityController.createDirection);

router.get('/disciplines', [
    Auth.verifyToken
], UniversityController.getDisciplines);
router.post('/disciplines', [
    Auth.verifyToken
], UniversityController.createDiscipline);

router.post('/groups', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin
], UniversityController.createGroup);
router.get('/groups', [
    Auth.verifyToken
], UniversityController.getGroups);

router.get('/students', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin
], UniversityController.getStudents);
router.post('/students', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin
], UniversityController.createStudent);

router.post('/teachers', [
    Auth.verifyToken
], UniversityController.createTeacher);

module.exports = router;