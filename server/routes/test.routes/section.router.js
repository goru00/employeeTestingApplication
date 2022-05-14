const Router = require('express');
const router = new Router();

const SectionController = require('../../controllers/test.controllers/section.controller');

router.post('/', SectionController.createSection);

module.exports = router;