import api from '../../api/api';

import authHeader from '../auth.header';

class TeacherService {
    getTeachers() {
        return api
            .get(`/university/teachers`);
    }
    createTeacherOfTheCathedra(userId, cathedraId) {
        return api
            .post(`/university/cathedras/${cathedraId}/teachers`, {
               userId 
            });
    }
    getTeachersOfTheCathedra(cathedraId) {
        return api
            .get(`/university/cathedras/${cathedraId}/teachers`);
    }
}

export default new TeacherService();