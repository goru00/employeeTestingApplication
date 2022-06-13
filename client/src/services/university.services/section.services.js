import api from '../../api/api';

import authHeader from '../auth.header';

class SectionService {
    createSection(name, description, disciplineId) {
        return api
            .post(`/university/disciplines/${disciplineId}/sections`, {
                name,
                description
            });
    }
    getSectionsOfTheDiscipline(disciplineId) {
        return api
            .get(`/university/disciplines/${disciplineId}/sections`);
    }
}

export default new SectionService();