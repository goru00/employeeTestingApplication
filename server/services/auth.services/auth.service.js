var bcrypt = require('bcryptjs');
const uuid = require('uuid');

const MailService = require('./mail.service');
const TokenService = require('./token.service');
const UserDto = require('../../dtos/user.dtos/user.dto');

const db = require('../../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const ApiError = require('../../exceptions/api.error');

class UserService {
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
        if (roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles);
            });
        } else {
            user.setRoles([1]);
        }
        const userDto = new UserDto(user);
        await MailService.sendActivationMail(email, activationLink);
        const tokens = await TokenService.createToken({...userDto});
        await TokenService.saveToken(userDto.userId, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async signin(props) {
        const { userId } = props;
        const user = await User.findByPk(userId);
        const userDto = new UserDto(user);
        const tokens = await TokenService.createToken({...userDto});
        await TokenService.saveToken(userDto.userId, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
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
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();