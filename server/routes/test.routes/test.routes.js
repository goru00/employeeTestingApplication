const AuthMiddleware = require('../../middlewares/auth.middlewares/auth.middleware');
const Tests = require('../../middlewares/test.middlewares/tests.middleware');
const TestController = require('../../controllers/test.controllers/test.controller');
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
    AuthMiddleware.isModeratorOrAdmin
], TestController.createSection);

router.get('/', [
    AuthMiddleware.isModeratorOrAdmin
], TestController.getTests);

router.get('/:userId', [
    AuthMiddleware.isUser
], TestController.getTests);

router.post('/', [
    AuthMiddleware.isModeratorOrAdmin
], TestController.createTest);
router.post('/:testId/start', [
    AuthMiddleware.isUser
], TestController.startTest);
router.post('/:testId/finish', [
    AuthMiddleware.isUser
], TestController.finishTest);
router.get('/:testId/result', TestController.getResult);
module.exports = router;