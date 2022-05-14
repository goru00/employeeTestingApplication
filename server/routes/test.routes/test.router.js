const Router = require('express');
const router = new Router();

const TestController = require('../../controllers/test.controllers/test.controller');

router.post('/', TestController.createTest);

module.exports = router;