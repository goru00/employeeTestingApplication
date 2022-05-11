const db = require('../../models');
const ROLES = db.ROLES;
const User = db.user;

const bcrypt = require('bcryptjs');

const ApiError = require('../../exceptions/api.error');

const TokenService = require('../../services/auth.services/token.service');

class AuthMiddleware {
    async checkDuplicateUsernameOrEmail(req, res, next) {
        User.findOne({
            where: {
                name: req.body.name
            }
        }).then(user => {
            if (user) {
                return next(ApiError.BadRequest(`Имя пользователя "${user.userId}" занято`));
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

    async validateAuth(req, res, next) {
        const { userId, password } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return next(ApiError.BadRequest('Пользователь с таким именем не был найден'));
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return next(ApiError.BadRequest('Неверный пароль'));
        }
        next();
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
        const userData = await TokenService.validateAccessToken(headerToken);
        if (!userData) {
            return next(ApiError.UnAuthError());
        }
        req.user = userData;
        next();
    }

    async isActivatedAccount(req, res, next) {
        User.findByPk(req.user.userId).then(user => {
            if (user.isActivated === false) {
                return next(ApiError.BadRequest(`Аккаунт не активирован`));
            }
            next();
        });
    }

    async isAdmin(req, res, next) {
        User.findByPk(req.user.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "Администратор") {
                        next();
                        return;
                    }
                }
                return next(ApiError.BadRequest("Нет права доступа 'Администратор'"));
            });
        });
    }
    async isMethodist(req, res, next) {
        User.findByPk(req.user.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "Методист") {
                        next();
                        return;
                    }
                }
                return next(ApiError.BadRequest("Нет права доступа 'Методист'"));
            });
        });
    }
    async isTeacher(req, res, next) {
        User.findByPk(req.user.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "Преподаватель") {
                        next();
                        return;
                    }
                }
                return next(ApiError.BadRequest("Нет права доступа 'Преподаватель'"));
            });
        });
    }
    async isStudent(req, res, next) {
        User.findByPk(req.user.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "Студент") {
                        next();
                        return;
                    }
                }
                return next(ApiError.BadRequest("Нет права доступа 'Студент'"));
            });
        });
    }
    async isModeratorOrAdmin(req, res, next) {
        User.findByPk(req.user.userId).then(user => {
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

module.exports = new AuthMiddleware();