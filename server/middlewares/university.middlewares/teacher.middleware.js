const db = require('../../models');
const Teacher = db.teacher;

const ApiError = require('../../exceptions/api.error');

class TeacherMiddleware {
    async checkExistsTabNum(req, res, next) {
        Teacher.findByPk(req.user.userId).then(teacher => {
            if (teacher) {
                return next(ApiError.BadRequest(`Преподаватель с таким табельным номером уже существует`));
            }
            next();
        });
    }
}

module.exports = new TeacherMiddleware();