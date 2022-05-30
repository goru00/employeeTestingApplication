const Router = require('express');
const router = new Router();

const DirectionController = require('../../controllers/university.controllers/direction.controller');

const DirectionMiddleware = require('../../middlewares/university.middlewares/direction.middleware');

router.post('/', [
    DirectionMiddleware.checkExistsName
], DirectionController.createDirection);

router.get('/', DirectionController.getDirections);

module.exports = router;