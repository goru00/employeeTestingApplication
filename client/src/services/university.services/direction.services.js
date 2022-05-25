import api from '../../api/api';

import authHeader from '../auth.header';

class DirectionService {
    getDirections(cathedraId) {
        return api
            .get(`/university/directions/${cathedraId}`);
    }
}

export default new DirectionService();