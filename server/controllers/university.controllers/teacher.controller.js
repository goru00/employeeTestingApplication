const TeacherService = require("../../services/university.services/teacher.service");

class TeacherController {
    async createTeacher(req, res, next) {
        try {
            const teacherData = await TeacherService.createTeacher({...req.body});
            return res.status(201).json({
                message: "Преподаватель был успешно добавлен",
                ...teacherData
            });
        } catch (err) {
            next(err);
        }
    }
    async getTeachers(req, res, next) {
        try {
            const teachers = await TeacherService.getTeachers({...req.params});
            return res.status(200).json(teachers);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TeacherController();