const Auth = require('../middlewares/auth');
const Tests = require('../middlewares/tests');
const TestController = require('../controllers/test.controller');
const Router = require('express');
const router = new Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post('/sections', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin
], TestController.createSection);

router.get('/', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin
], TestController.getTests);

router.get('/:userId', [
    Auth.verifyToken,
    Auth.isUser
], TestController.getTests);

router.post('/', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin
], TestController.createTest);
router.post('/:testId/start', [
    Auth.verifyToken,
    Auth.isUser
], TestController.startTest);
router.post('/:testId/finish', [
    Auth.verifyToken,
    Auth.isUser
], TestController.finishTest);
router.get('/:testId/result', [
    Auth.verifyToken
], TestController.getResult);
module.exports = router;