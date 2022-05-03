const UserService = require('../../services/user.services/user.service');

class UserController {
    async getUsers(req, res) {
        try {       
            const users = await UserService.getUsers({...req.params});
            return res.status(200).json(users);
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = new UserController();