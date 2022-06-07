import api from '../../api/api';

import authHeader from '../auth.header';

class DirectionService {
    createDirection(id, name, cathedraId) {
        return api
            .post(`/university/cathedras/${cathedraId}/directions`, {
                id,
                name,
                cathedraId
            });
    }
    getDirectionsByCathedra(cathedraId) {
        return api
            .get(`/university/cathedras/${cathedraId}/directions/`);
    }
    getDirection(directionId) {
        return api
            .get(`/university/directions/${directionId}`);
    }
}

export default new DirectionService();