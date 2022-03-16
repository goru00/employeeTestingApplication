import axios from 'axios';

class AuthService {
    login(username, password) {
        return axios
            .post('http://localhost:8080/v1/api/auth/signin', {
                username,
                password
            }).then(res => {
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                return res.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username, password) {
        return axios.post("http://localhost:8080/v1/api/auth/signup", {
            username,
            password
        });
    }
}

export default new AuthService();