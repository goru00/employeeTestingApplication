const db = require('../../models');
const Student = db.student;
const Teacher = db.teacher;

const ApiError = require('../../exceptions/api.error');

class InvolvedMiddleware {
    async checkExistsInvolved(req, res, next) {
        const student = await Student.findByPk(req.user.userId);
        const teacher = await Teacher.findByPk(req.user.userId);
        if (student || teacher) {
            return next(ApiError.BadRequest(`Данный пользователь уже занят`));
        }
        next();
    }
}

module.exports = new InvolvedMiddleware();