import api from '../../api/api';

import authHeader from '../auth.header';

class TestService {
    createTest(params) {
        return api
            .post('/tests', {
                params
            });
    }
    getTestsOfTheSection(disciplineId, sectionId) {
        return api
            .get(`/university/disciplines/${disciplineId}/sections/${sectionId}/tests`);
    }
}

export default new TestService();