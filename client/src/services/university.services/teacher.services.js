import api from '../../api/api';

import authHeader from '../auth.header';

class TeacherService {
    getTeachers() {
        return api
            .get(`/university/teachers`);
    }
    createTeacherOfTheCathedra(userId, cathedraId) {
        return api
            .post(`/university/teachers/${cathedraId}`, {
               userId 
            });
    }
    getTeachersOfTheCathedra(cathedraId) {
        return api
            .get(`/university/teachers/${cathedraId}`);
    }
}

export default new TeacherService();