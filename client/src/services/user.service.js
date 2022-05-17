import api from '../api/api';
import authHeader from './auth.header';

import TokenService from "./token.service";

class UserService {
  getTests() {
    return api
        .get('/tests/' + TokenService.getUser().userId).then(res => {
            return res.data;
        });
  }
  getUsers() {
    return api
        .get('/users', { headers: authHeader() }).then(res => {
            return res.data;
        });
  }
}

export default new UserService();
