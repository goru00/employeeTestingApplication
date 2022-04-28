const db = require('../models');

const User = db.user;
const Op = db.Sequelize.Op;

const UserDto = require('../dtos/user.dto');

class UserService {
    async getUsers(params) {
        const { userId } = params;
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { username: userId ?? null},
                    { username: null}
                ]
            }
        });
        let usersDto = [];
        for (let index = 0; index < users.length; index++) {
            usersDto.push(new UserDto(users[index]));
        }
        return {
            users: usersDto
        }
    }
}

module.exports = new UserService();