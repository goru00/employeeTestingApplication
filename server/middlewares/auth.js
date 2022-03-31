const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;
const Position = db.position;

const ApiError = require('../exceptions/api.error');

const AuthService = require('../services/auth.service');

class Auth {
    async checkDuplicateUsernameOrEmail(req, res, next) {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            if (user) {
                return next(ApiError.BadRequest(`Имя пользователя "${user.username}" занято`));
            }
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user => {
                if (user) {
                    return next(ApiError.BadRequest(`Ошибка! Почта ${user.email} уже занята`));
                }
                next();
            });
        });
    }
    async checkUsersExisted(req, res, next) {
        User.findOne({
            where: {
                name: req.body.name
            }
        }).then(user => {
            if (!user) {
                return next(ApiError.BadRequest("Пользователь не найден"));
            }
            next();
        });
    }
    async checkRolesExisted(req, res, next) {
        if (req.body.roles) {
            req.body.roles.forEach(role => {
                if (!ROLES.includes(role)) {
                    return next(ApiError.BadRequest(`Роли "${role}" не существует`));
                }
            });
        }
        next();
    }

    async verifyToken(req, res, next) {
        const headerToken = req.headers["x-access-token"];
        if (!headerToken) {
            return next(ApiError.UnAuthError());
        }
        const token = headerToken;
        if (!token) {
            return next(ApiError.UnAuthError());
        }
        const userData = AuthService.validateAccessToken(token);

        req.user = userData;
        next();
    }

    async checkDuplicatePositionName(req, res, next) {
        Position.findOne({
            where: {
                name: req.body.name
            }
        }).then(position => {
            if (position) {
                return next(ApiError.BadRequest(`Должность уже существует`));
            }
            next();
        });
    }

    async isAdmin(req, res, next) {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "admin") {
                        next();
                        return;
                    }
                }
                return next(ApiError.BadRequest("Нет права доступа 'admin'"));
            });
        });
    }
    async isModerator(req, res, next) {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "moderator") {
                        next();
                        return;
                    }
                }
                return next(ApiError.BadRequest("Нет права доступа 'moderator'"));
            });
        });
    }
    async isUser(req, res, next) {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "user") {
                        next();
                        return;
                    }
                }
                return next(ApiError.BadRequest("Нет права доступа 'user'"));
            });
        });
    }
    async isModeratorOrAdmin(req, res, next) {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "admin") {
                        next();
                        return;
                    }
                    if (roles[index].name === "moderator") {
                        next();
                        return;
                    }
                }
                return next(ApiError.BadRequest("Нет права доступа 'admin' или 'moderator'"));
            });
        });
    }
}

module.exports = new Auth();