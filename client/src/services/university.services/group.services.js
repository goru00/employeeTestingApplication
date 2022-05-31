import api from '../../api/api';

import authHeader from '../auth.header';

class GroupService {
    getGroupOfTheDirection(cathedraId, directionId) {
        return api
            .get(`/university/${cathedraId}/directions/${directionId}`);
    }
}

export default new GroupService();