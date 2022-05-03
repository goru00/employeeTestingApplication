const Router = require('express');
const router = new Router();

const CathedraController = require('../../controllers/university.controllers/cathedra.controller');

const CathedraMiddleware = require('../../middlewares/university.middlewares/cathedra.middleware');

router.post('/', [
    CathedraMiddleware.checkExistsName
], CathedraController.createCathedra);

router.get('/', CathedraController.getCathedras);

module.exports = router;