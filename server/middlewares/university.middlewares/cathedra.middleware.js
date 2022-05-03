const db = require('../../models');
const Cathedra = db.cathedra;

class CathedraMiddleware {
    async checkExistsName(req, res, next) {
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
}

module.exports = new CathedraMiddleware();