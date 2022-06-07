import api from '../../api/api';

import authHeader from '../auth.header';

class StudentServices {
    createStudent(studentId, groupId) {
        return api
            .post(`/university/groups/${groupId}/students`, {
                userId: studentId
            });
    }
    getStudents() {
        return api
            .get(`/university/students`)
    }
    getStudentsOfTheGroup(groupId) {
        return api
            .get(`/university/groups/${groupId}/students`);
    }
}

export default new StudentServices();