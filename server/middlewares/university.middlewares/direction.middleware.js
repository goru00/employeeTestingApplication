const db = require('../../models');
const Direction = db.direction;

const ApiError = require('../../exceptions/api.error');

class DirectionMiddleware {
    async checkExistsName(req, res, next) {
        Direction.findOne({
            where: {
                name: req.body.name
            }
        }).then(direction => {
            if (direction) {
                return next(ApiError.BadRequest(`Ошибка! Данное направление уже существует`));
            }
            next();
        });
    }
}

module.exports = new DirectionMiddleware();