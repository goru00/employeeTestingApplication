import api from '../api/api';
import TokenService from './token.service';

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
    register(username, password) {
        return api.post("/auth/signup", {
            userId: username,
            password
        });
    }
}

export default new AuthService();