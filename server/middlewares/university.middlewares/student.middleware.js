const db = require('../../models');
const Student = db.student;

const ApiError = require('../../exceptions/api.error');

class StudentMiddleware {
    async checkExistsTabNum(req, res, next) {
        Student.findByPk(req.user.userId).then(student => {
            if (student) {
                return next(ApiError.BadRequest(`Студент с таким табельным номером уже существует`));
            }
            next();
        });
    }
}

module.exports = new StudentMiddleware();