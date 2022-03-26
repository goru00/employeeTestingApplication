import api from '../api/api';

import TokenService from "./token.service";

class UserService {
  getTests() {
    return api
        .get('/tests/' + TokenService.getUser().username).then(res => {
            return res.data;
        });
  }
}

export default new UserService();
