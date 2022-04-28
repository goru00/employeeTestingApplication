const UserService = require('../services/user.service');

class UserController {
    async getUsers(req, res) {
        try {       
            console.log(req.params["userId"])
            const users = await UserService.getUsers({...req.params});
            return res.status(200).json(users);
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = new UserController();