const Router = require('express');
const router = new Router();

const DisciplineController = require('../../controllers/university.controllers/discipline.controller');

const DisciplineMiddleware = require('../../middlewares/university.middlewares/discipline.middleware');

router.post('/', [
    DisciplineMiddleware.checkExistsName
], DisciplineController.createDiscipline);

module.exports = router;