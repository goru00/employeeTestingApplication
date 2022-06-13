const TestDto = require('../../dtos/test.dtos/test.dto');
const db = require('../../models');
const Test = db.test;

class TestService {
    async createTest(params) {

    }

    async getTestsOfTheSection(disciplineId, sectionId) {
        const tests = await Test.findAll({
            where: {
                disciplineId: disciplineId,
                sectionId: sectionId
            }
        });
        let testsDto = [];
        for (let index = 0; index < tests.length; index++) {
            testsDto.push(new TestDto(tests[index]));
        }
        return {
            tests: testsDto
        }
    }

}

module.exports = new TestService();