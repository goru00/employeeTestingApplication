const db = require('../../models');
const Group = db.group;

const ApiError = require('../../exceptions/api.error');

class GroupMiddleware {
    async checkExistsName(req, res, next) {
        Group.findOne({
            where: {
                id: req.body.groupId
            }
        }).then(group => {
            if (group) {
                return next(ApiError.BadRequest(`Ошибка! Данная группа уже существует`));
            }
            next();
        });
    }
}

module.exports = new GroupMiddleware();