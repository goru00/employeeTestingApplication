import api from '../../api/api';

import authHeader from '../auth.header';

class DirectionService {
    createDirection(id, name, cathedraId) {
        return api
            .post(`/university/directions/`, {
                id,
                name,
                cathedraId
            });
    }
    getDirections(cathedraId) {
        return api
            .get(`/university/${cathedraId}/directions/`);
    }
}

export default new DirectionService();