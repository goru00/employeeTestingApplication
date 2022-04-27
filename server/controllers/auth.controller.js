const db = require('../models');
const ConfigAuth = require('../configs/auth.config');
const ConfigClient = require('../configs/client.config');
const { user: User, 
        role: Role,
        refreshToken: RefreshToken 
} = db; 
const Op = db.Sequelize.Op;

const AuthService = require('../services/auth.service');

class AuthController {

    async signup(req, res) {
        try {
            const userData = await AuthService.signup({...req.body});
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
            const userData = await AuthService.signin({...req.body});
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
            const token = await AuthService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json(token);
        } catch (e) {
            console.log(e)
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const tokenData = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', tokenData.refreshToken, {
                maxAge: ConfigAuth.jwtRefreshExpiration,
                httpOnly: true
            });
            return res.status(200).json(tokenData);
        } catch (e) {
            console.log(e);
        }
    }

    async activate(req, res) {
        try {
            const activationLink = req.params.link;
            await AuthService.activate(activationLink);
            return res.redirect(ConfigClient.URL);
        } catch (err) {
            return res.status(500).send({
                message: err.message
            });
        }
    }
}

module.exports = new AuthController();