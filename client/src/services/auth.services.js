import api from '../api/api';
import TokenService from './token.service';

import authHeader from './auth.header';

class AuthService {
    login(username, password) {
        return api
            .post('/auth/signin', {
                userId: username,
                password
            }).then(res => {
                if (res.data.token) {
                    TokenService.setUser(res.data);
                }
                return res.data;
            });
    }
    logout() {
        TokenService.removeUser();
    }
    register(username, password, name, email, roles) {
        return api.post("/auth/signup", {
            userId: username,
            name,
            password,
            email,
            roles
        });
    }
    getRoles() {
        return api
            .get('/auth/roles', { headers: authHeader() });
    }
}

export default new AuthService();