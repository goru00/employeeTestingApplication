const ConfigAuth = require('../../configs/auth.config');
const ConfigClient = require('../../configs/client.config');
const AuthService = require('../../services/auth.services/auth.service');

class AuthController {

    async signup(req, res, next) {
        try {
            const userData = await AuthService.signup({...req.body});
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: ConfigAuth.jwtRefreshExpiration,
                httpOnly: true
            });
            return res.status(201).json({
                message: "Пользователь был успешно создан",
                ...userData
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async signin(req, res, next) {
        try {
            const userData = await AuthService.signin({...req.body});
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: ConfigAuth.jwtRefreshExpiration,
                httpOnly: true
            });
            return res.status(201).json(userData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await AuthService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json(token);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const tokenData = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', tokenData.refreshToken, {
                maxAge: ConfigAuth.jwtRefreshExpiration,
                httpOnly: true
            });
            return res.status(200).json(tokenData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await AuthService.activate(activationLink);
            return res.redirect(ConfigClient.URL);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getRoles(req, res, next) {
        try {
            const rolesData = await AuthService.getRoles();
            return res.status(200).json(rolesData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = new AuthController();