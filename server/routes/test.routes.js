const Auth = require('../middlewares/auth');
const Tests = require('../middlewares/tests');
const testController = require('../controllers/test.controller');
const Router = require('express');
const router = new Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post('/', [
    Auth.verifyToken,
    Auth.isModeratorOrAdmin,
    Tests.checkDuplicateTestName,
    Tests.checkSectionIdExists,
    Auth.checkErrorUsersAndPositions,
    Tests.checkEqLengthQuestionsAndAnswers
], testController.create);
router.get('/', testController.get);

module.exports = router;