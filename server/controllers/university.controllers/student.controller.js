const StudentService = require('../../services/university.services/student.service');

class StudentController {
    async createStudent(req, res, next) {
        try {
            const studentData = await StudentService.createStudent({...req.body});
            return res.status(201).json({
                message: "Студент был успешно добавлен",
                ...studentData
            });            
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new StudentController();