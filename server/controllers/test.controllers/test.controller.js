const testService = require('../../services/test.services/test.service');

class TestController {

    async createTest(req, res, next) {
        try {
            const testData = await testService.createTest({...req.body});
            return res.status(201).json({
                message: "Тест был успешно создан",
                ...testData
            });
        } catch (err) {
            next(err);
        }
    }
    async getTestsOfTheSection(req, res, next) {
        try {
            const testData = await testService.getTestsOfTheSection({...req.params});
            return res.status(200).json(testData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = new TestController();