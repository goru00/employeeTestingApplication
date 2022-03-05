const db = require('../models');
const Cathedra = db.cathedra;
const Direction = db.direction;

class University {
    async checkExistsCathedra(req, res, next) {
        Cathedra.findOne({
            where: {
                name: req.body.cathedraName
            }
        }).then(cathedra => {
            if (!cathedra) {
                res.status(404).send({
                    message: "Кафедра не была найдена"
                });
                return;
            }
            next()
        });
    }
    async checkExistsDirection(req, res, next) {
        Direction.findOne({
            where: {
                name: req.body.directionName
            }
        }).then(direction => {
            if (!direction) {
                res.status(404).send({
                    message: "Направление не было найдено"
                });
            }
            next();
        });
    }
}

module.exports = new University();