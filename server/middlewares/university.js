const db = require('../models');
const Cathedra = db.cathedra;
const Direction = db.direction;
const Teacher = db.teacher;

class University {
    async checkExistsCathedra(req, res, next) {
        Cathedra.findOne({
            where: {
                name: req.body.cathedraName
            }
        }).then(cathedra => {
            if (cathedra) {
                res.status(403).send({
                    message: "Ошибка! Данная кафедра уже существует"
                });
                return;
            }
            next();
        });
    }
    async checkRequireTeacher(req, res, next) {
        Teacher.findByPk(req.userId).then(user => {
            if (!user) {
                res.status(403).send({
                    message: "Ошибка! Данный пользователь не является преподавателем"
                });
                return;
            }
            next();
        });
    }
    async checkExistsDirection(req, res, next) {
        Direction.findOne({
            where: {
                name: req.body.directionName
            }
        }).then(direction => {
            if (direction) {
                res.status(403).send({
                    message: "Ошибка! Данное направление уже существует"
                });
                return;
            }
            next();
        });
    }
}

module.exports = new University();