var bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const MailService = require('./mail.service');
const TokenService = require('./token.service');
const AuthDto = require('../dtos/auth.dto');

const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const AuthConfig = require('../configs/auth.config');

const ApiError = require('../exceptions/api.error');

class AuthService {
    async signup(props) {
        const { username, email, name, password, roles } = props;
        const hashPassword = await bcrypt.hash(password, 8);
        const activationLink = uuid.v4();
        const user = await User.create({
            username: username,
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
        const userDto = new AuthDto(user);
        await MailService.sendActivationMail(email, activationLink);
        const tokens = await TokenService.createToken({...userDto});
        await TokenService.saveToken(userDto.username, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async validateAccessToken(token) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(token, AuthConfig.secret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async signin(props) {
        const { username } = props;
        const user = await User.findByPk(username);
        const userDto = new AuthDto(user);
        const tokens = await TokenService.createToken({...userDto});
        await TokenService.saveToken(userDto.username, tokens.refreshToken);
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

    }
}

module.exports = new AuthService();