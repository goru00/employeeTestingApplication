import api from '../../api/api';

class DisciplineService {
    createDisciplineOfTheGroup(disciplineId, groupId) {
        return api
            .post(`/university/groups/${groupId}/disciplines`, {
                disciplineId
            });
    }

    createDiscipline(id, name) {
        return api
            .post(`/university/disciplines/`, {
                id,
                name
            });
    }

    getDisciplinesOfTheTeacher(userId) {
        return api
            .get(`/university/teachers/${userId}/disciplines`);
    }

    getDisciplinesOfTheStudent(userId) {
        return api
            .get(`/university/students/${userId}/disciplines`);
    }

    getDiscipline(id) {
        return api
            .get(`/university/disciplines/${id}`);
    }

    getDisciplines() {
        return api
            .get(`/university/disciplines`);
    }

    getDisciplinesOfTheGroup(groupId) {
        return api
            .get(`/university/groups/${groupId}/disciplines`);
    }

}

export default new DisciplineService();