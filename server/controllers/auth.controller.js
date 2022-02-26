const db = require('../models');
const config = require('../configs/auth.config');
const { user: User, 
        role: Role, 
        position: Position, 
        refreshToken: RefreshToken 
} = db; 
const Op = db.Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

class AuthController {
    async signup(req, res) {
        const { username, password, name, email, positions, roles } = req.body;
        User.create({
            username: username,
            password: bcrypt.hashSync(password, 8),
            name: name,
            email: email
        }).then(user => {
            if (positions) {
                Position.findAll({
                    where: {
                        name: {
                            [Op.or]: positions
                        }
                    }
                }).then(positions => {
                    user.setPositions(positions).then(() => {
                        if (roles) {
                            Role.findAll({
                                where: {
                                    name: {
                                        [Op.or]: roles
                                    }
                                }
                            }).then(roles => {
                                user.setRoles(roles).then(() => {
                                    res.send({
                                        message: "Пользователь успешно зарегистрирован"
                                    });
                                });
                            });
                        } else {
                            user.setRoles([1]).then(() => {
                                res.send({
                                    message: "Пользователь успешно зарегистрирован"
                                });
                            });
                        }
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
                });
            } else {
                if (roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Or.or]: roles
                            }
                        }
                    }).then(() => {
                        user.setRoles(roles).then(() => {
                            res.send({
                                message: "Пользователь успешно зарегистрирован"
                            });
                        });
                    });
                } else {
                    user.setRoles([1]).then(() => {
                        res.send({
                            message: "Пользователь успешно зарегистрирован"
                        });
                    });
                }
            }   
        });
    }
    async signin(req, res) {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(async user => {
            if (!user) {
                return res.status(404).send({
                    message: "Пользователь не был найден"
                });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Некорректный пароль"
                });
            }
            const token = jwt.sign({
                id: user.username
            }, config.secret, {
                expiresIn: config.jwtExpiration
            });
            let refreshToken = await RefreshToken.createToken(user);
            let rolesArr = [], positionsArr = [];
            user.getRoles().then(roles => {
                roles.forEach(role => {
                    rolesArr.push(role.name);
                });
                user.getPositions().then(positions => {
                    positions.forEach(position => {
                        positionsArr.push(position.name);
                    });
                    res.send({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        roles: rolesArr,
                        positions: positionsArr,
                        accessToken: token,
                        refreshToken: refreshToken
                    });
                });
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    }
    async refreshToken(req, res) {
        const { refreshToken: requestToken } = req.body;
        if (requestToken == null) {
            return res.status(403).json({
                message: "Не обновлен токен!"
            });
        }
        try {
            let refreshToken = await RefreshToken.findOne({
                where: {
                    token: requestToken
                }
            });
            if (!refreshToken) {
                res.status(403).json({
                    message: "Токен не обнаружен в базе данных"
                });
                return;
            }
            if (RefreshToken.verifyExpiration(refreshToken)) {
                RefreshToken.destroy({
                    where: {
                        id: refreshToken.id
                    }
                });
                res.status(403).json({
                    message: "Токен невалиден. Пожалуйста, авторизируйтесь"
                });
                return;
            }
            const user = await refreshToken.getUser();
            let newAccessToken = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: config.jwtExpiration
            });
            return res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: refreshToken.token
            });
        } catch (err) {
            return res.status(500).send({
                message: err
            });
        }
    }
}

module.exports = new AuthController();