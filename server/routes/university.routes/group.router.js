const Router = require('express');
const router = new Router();

const GroupController = require('../../controllers/university.controllers/group.controller');

const GroupMiddleware = require('../../middlewares/university.middlewares/group.middleware');

router.post('/', [
    GroupMiddleware.checkExistsName
], GroupController.createGroup);

module.exports = router;