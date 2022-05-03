const db = require('../../models');
const Discipline = db.discipline;

const ApiError = require('../../exceptions/api.error');

class DisciplineMiddleware {
    async checkExistsName(req, res, next) {
        Discipline.findOne({
            where: {
                name: req.body.disciplineName
            }
        }).then(discipline => {
            if (discipline) {
                return next(ApiError.BadRequest(`Ошибка! Данная дисциплина уже существует`));
            }
            next();
        });
    }
}

module.exports = new DisciplineMiddleware();