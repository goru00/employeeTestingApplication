const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;
const Position = db.position;

const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

class Auth {
    checkDuplicateUsernameOrEmail(req, res, next) {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Ошибка! Имя пользователя уже занято"
                });
                return;
            }
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user => {
                if (user) {
                    res.status(400).send({
                        message: "Ошибка! Почта уже занята"
                    });
                    return;
                }
                next();
            });
        });
    }
    checkRolesExisted(req, res, next) {
        if (req.body.roles) {
            req.body.roles.forEach(role => {
                if (!ROLES.includes(role)) {
                    res.status(400).send({
                        message: "Ошибка! Роль '" + role + "' не существует"
                    });
                    return;
                }
            })
        }
        next();
    }

    catchError(err, res) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).send({
                message: "Не авторизован. Токен не был валидным"
            });
        }
        return res.sendStatus(401).send({
            message: "Не авторизован"
        });
    }

    verifyToken(req, res, next) {
        let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send({
                message: "Токен невалидный"
            });
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return this.catchError(err, res);
            }
            req.userId = decoded.id;
            next();
        });
    }

    async checkDuplicatePositionName(req, res, next) {
        Position.findOne({
            where: {
                name: req.body.name
            }
        }).then(position => {
            if (position) {
                res.status(400).send({
                    message: "Ошибка! Должность уже существует"
                });
                return;
            }
            next();
        });
    }

    isAdmin(req, res, next) {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Нет права доступа 'admin'"
                });
                return;
            });
        });
    }
    isModerator(req, res, next) {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "moderator") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Нет прав доступа 'moderator'"
                });
                return;
            });
        });
    }
    isUser(req, res, next) {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].name === "moderator") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Нет прав доступа 'user'"
                });
                return;
            });
        });
    }
    isModeratorOrAdmin(req, res, next) {
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
                res.status(403).send({
                    message: "Нет прав доступа 'admin' или 'moderator'"
                });
                return;
            });
        });
    }
}

module.exports = new Auth();