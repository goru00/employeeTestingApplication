const Auth = require('../middlewares/auth');
const positionController = require('../controllers/position.controller');
const Router = require('express');
const router = new Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/', positionController.get);
router.post('/', [
    Auth.verifyToken,
    Auth.isAdmin,
    Auth.checkDuplicatePositionName
], positionController.create);

module.exports = router;