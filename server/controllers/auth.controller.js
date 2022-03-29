const db = require('../models');
const ConfigAuth = require('../configs/auth.config');
const ConfigClient = require('../configs/client.config');
const { user: User, 
        role: Role,
        refreshToken: RefreshToken 
} = db; 
const Op = db.Sequelize.Op;

const UserService = require('../services/auth.service');


class AuthController {

    async getUsers(req, res) {
        const { id } = req.params;
        User.findByPk(id).then(user => {
            if (!user) {
                res.status(404).send({
                    message: 'Пользователь не был найден'
                });
            }
            res.status(200).send({
                username: user.username,
                name: user.name,
                email: user.email
            });
        })
    }

    async signup(req, res) {
        try {
            const userData = await UserService.signup({...req.body});
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: ConfigAuth.jwtRefreshExpiration,
                httpOnly: true
            });
            return res.status(201).json(userData);
        } catch (e) {
            console.error(e);
        }
    }
    async signin(req, res) {
        try {
            const { username } = req.body;
            const userData = await UserService.signin(username);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: ConfigAuth.jwtRefreshExpiration,
                httpOnly: true
            });
            return res.status(201).json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json(token);
        } catch (e) {
            
        }
    }

    async activate(req, res) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(ConfigClient.URL);
        } catch (e) {
            return res.status(500).send({
                message: err
            });
        }
    }
}

module.exports = new AuthController();