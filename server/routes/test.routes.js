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
    Auth.isModeratorOrAdmin
], TestController.createSection);

router.get('/', [
    Auth.isModeratorOrAdmin
], TestController.getTests);

router.get('/:userId', [
    Auth.isUser
], TestController.getTests);

router.post('/', [
    Auth.isModeratorOrAdmin
], TestController.createTest);
router.post('/:testId/start', [
    Auth.isUser
], TestController.startTest);
router.post('/:testId/finish', [
    Auth.isUser
], TestController.finishTest);
router.get('/:testId/result', TestController.getResult);
module.exports = router;