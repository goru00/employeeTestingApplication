import api from '../../api/api';

import authHeader from '../auth.header';

class GroupService {
    createGroup(id, directionId, cathedraId) {
        return api
            .post(`/university/cathedras/${cathedraId}/directions/${directionId}/groups`, {
                id,
                directionId
            });
    }
    getGroupsOfTheDirection(cathedraId, directionId) {
        return api
            .get(`/university/cathedras/${cathedraId}/directions/${directionId}/groups`);
    }
}

export default new GroupService();