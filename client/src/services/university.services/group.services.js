import api from '../../api/api';

import authHeader from '../auth.header';

class GroupService {
    createGroup(id, directionId) {
        return api
            .post(`/university/directions/${directionId}/groups`, {
                id
            });
    }
    getGroupsOfTheDirection(directionId) {
        return api
            .get(`/university/directions/${directionId}/groups`);
    }
    getGroupsOfTheDiscipline(disciplineId) {
        return api
            .get(`/university/disciplines/${disciplineId}/groups`);
    }
}

export default new GroupService();