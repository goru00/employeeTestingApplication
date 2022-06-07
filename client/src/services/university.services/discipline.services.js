import api from '../../api/api';

class DisciplineService {
    createDisciplineOfTheGroup(id, groupId) {
        return api
            .post(`/university/groups/${groupId}/disciplines`, {
                id
            });
    }

    getDisciplines() {
        return api
            .get(`/disciplines`);
    }

    getDisciplinesOfTheGroup(groupId) {
        return api
            .get(`/university/groups/${groupId}/disciplines`);
    }

}

export default new DisciplineService();