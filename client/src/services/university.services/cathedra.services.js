import api from '../../api/api';

import authHeader from '../auth.header';

class CathedraService {
    createCathedra(name) {
        return api
            .post('/university/cathedras', {
                cathedraName: name
            }, {
                headers: authHeader()
            });
    }
    getCathedras(id) {
        if (id) {
            return api
                .get(`/university/cathedras/${id}`);
        }
        return api
                .get('/university/cathedras');
    }
}

export default new CathedraService();