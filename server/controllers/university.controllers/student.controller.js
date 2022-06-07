const StudentService = require('../../services/university.services/student.services');

class StudentController {
    async createStudent(req, res, next) {
        try {
            const studentData = await StudentService.createStudent({...req.body, ...req.params});
            return res.status(201).json({
                message: "Студент был успешно добавлен в группу",
                ...studentData
            })
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async getStudentsOfTheGroup(req, res, next) {
        try {
            const students = await StudentService.getStudentsOfTheGroup({...req.params});
            return res.status(200).json(students);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getStudents(req, res, next) {
        try {
            const students = await StudentService.getStudents({...req.params});
            return res.status(200).json(students);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = new StudentController();