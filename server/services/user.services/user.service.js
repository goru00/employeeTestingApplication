const db = require('../../models');

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const UserDto = require('../../dtos/user.dtos/user.dto');

class UserService {
    async getUsers(params) {
        const { name, userId } = params;
        if (userId) {
            const user = await User.findByPk(userId);
            const userDto = new UserDto(user);
            return {
                user: userDto
            }
        }
        if (name) {
            const user = await User.findOne({
                where: {
                    name: name
                }
            });
            const userDto = new UserDto(user);
            return {
                user: userDto
            }
        }
        const users = await User.findAll();
        let usersDto = [];
        for (let index = 0; index < users.length; index++) {
            usersDto.push(await this.getUserRoles(usersDto.userId));
        }
        return {
            usersDto
        }
    }
    async setUserRoles(user, roles) {
        Role.findAll({
            where: {
                name: {
                    [Op.or]: roles
                }
            }
        }).then(roles => {
            user.setRoles(roles);
        });
        const userDto = new UserDto(user);
        userDto.roles = roles;
        return {
            ...userDto
        }
    }
    async getUserRoles(userId) {
        const userRoles = await User.findByPk(userId, {
            include: {
                model: Role,
                attributes: ['name'],
                as: 'roles'
            }
        });
        const userDto = new UserDto(userRoles);
        userDto.roles = userRoles.roles.map(role => role.name);
        return {
            ...userDto
        }
    }
}

module.exports = new UserService();