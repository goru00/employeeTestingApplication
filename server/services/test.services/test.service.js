const TestDto = require('../../dtos/test.dtos/test.dto');
const db = require('../../models');
const Test = db.test;

class TestService {
    async createTest(user, params) {
        const { 
            nameTest,  
            disciplineId, 
            sectionId, 
            description,
            time,
            date 
        } = params;
        const {
            userId
        } = user;
        const test = await Test.create({
            name: nameTest,
            teacherId: userId,
            disciplineId: disciplineId,
            sectionId: sectionId,
            description: description,
            time: time,
            date: date
        });
        const testDto = new TestDto(test);
        return {
            ...testDto
        }
    }
    async getUserTests() {

    }
}

module.exports = new TestService();