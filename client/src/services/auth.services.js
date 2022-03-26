import api from '../api/api';
import TokenService from './token.service';

class AuthService {
    login(username, password) {
        return api
            .post('/auth/signin', {
                username,
                password
            }).then(res => {
                if (res.data.accessToken) {
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
            username,
            password
        });
    }
}

export default new AuthService();