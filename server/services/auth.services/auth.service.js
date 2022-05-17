var bcrypt = require('bcryptjs');
const uuid = require('uuid');

const MailService = require('./mail.service');
const TokenService = require('./token.service');
const UserService = require('../user.services/user.service');
const UserDto = require('../../dtos/user.dtos/user.dto');

const db = require('../../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const ApiError = require('../../exceptions/api.error');
const RoleDto = require('../../dtos/user.dtos/role.dto');

class AuthService {
    async signup(props) {
        const { userId, email, name, password, roles } = props;
        const hashPassword = await bcrypt.hash(password, 8);
        const activationLink = uuid.v4();
        const user = await User.create({
            userId: userId,
            name: name,
            email: email,
            password: hashPassword,
            activationLink: activationLink
        });
        const userDto = await UserService.setUserRoles(user, roles);
        const tokens = await TokenService.createToken({...userDto});
        await TokenService.saveToken(userDto.userId, tokens.refreshToken);
        await MailService.sendActivationMail(email, activationLink);
        return {
            ...userDto,
            ...tokens
        }
    }

    async signin(props) {
        const { userId } = props;
        const user = await User.findByPk(userId, { 
            include: {
                model: Role,
                attributes: ['name']
            }
        });
        const userDto = await UserService.getUserRoles(user.userId);
        const tokens = await TokenService.createToken({...userDto});
        await TokenService.saveToken(userDto.userId, tokens.refreshToken);
        return {
            ...userDto,
            ...tokens
        }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async activate(activationLink) {
        const user = await User.findOne({
            where: {
                activationLink: activationLink
            }
        });
        user.isActivated = true;
        await user.save();
    }

    async refresh(refreshToken) {
        const userData = await TokenService.validateRefreshToken(refreshToken);
        const token = await TokenService.fintToken(refreshToken);
        // переписать
        if (!userData || !token) {
            throw ApiError.UnAuthError();
        }

        const user = await User.findByPk(userData.userId);
        const userDto = new UserDto(user);
        const tokens = TokenService.createToken({...userDto});
        await TokenService.saveToken(userDto.userId, tokens.refreshToken);
        return {
            ...userDto,
            ...tokens
        }
    }

    async getRoles() {
        const rolesData = await Role.findAll();
        let rolesDto = [];
        for (let index = 0; index < rolesData.length; index++) {
            rolesDto.push(new RoleDto(rolesData[index]))
        }
        return {
            rolesDto
        }
    }
}

module.exports = new AuthService();