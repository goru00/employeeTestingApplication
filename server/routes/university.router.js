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
    Auth.isModeratorOrAdmin
], UniversityController.createCathedra);

router.get('/directions', [
    Auth.verifyToken
], UniversityController.getDirections);
router.post('/directions', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin,
    University.checkExistsCathedra
], UniversityController.createDirection);

router.post('/groups', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin,
    University.checkExistsDirection
], UniversityController.createGroup);
router.post('/students', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin
], UniversityController.createStudent);

module.exports = router;