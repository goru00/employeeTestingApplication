const Auth = require('../middlewares/auth');
const Tests = require('../middlewares/tests');
const sectionController = require('../controllers/section.controller');
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
    Auth.isAdmin,
    Tests.checkDuplicateSectionName
], sectionController.create);
router.get('/', sectionController.get);

module.exports = router;