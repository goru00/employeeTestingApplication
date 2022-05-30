const Router = require('express');
const router = new Router();

const CathedraController = require('../../controllers/university.controllers/cathedra.controller');

const directionRouter = require('./direction.router');

const CathedraMiddleware = require('../../middlewares/university.middlewares/cathedra.middleware');

router.post('/', [
    CathedraMiddleware.checkExistsName
], CathedraController.createCathedra);

router.get('/', CathedraController.getCathedras);
router.get('/:id', CathedraController.getCathedras);

router.use('/:id/directions', directionRouter);

module.exports = router;