const TeacherService = require('../../services/university.services/teacher.service');

class TeacherController {
    async getTeachers(req, res, next) {
        try {
            const teacherData = await TeacherService.getTeachers({...req.body});
            return res.status(200).json(teacherData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async getTeachersOfTheDiscipline(req, res, next) {
        try {
            const teacherData = await TeacherService.getTeachersOfTheDiscipline({...req.params});
            return res.status(200).json(teacherData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async getTeachersOfTheCathedra(req, res, next) {
        try {
            const teacherData = await TeacherService.getTeachersOfTheCathedra({...req.params});
            return res.status(200).json(teacherData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async createTeacherOfTheCathedra(req, res, next) {
        try {
            const teacherData = await TeacherService.createTeacherOfTheCathedra(req.body.userId, req.params.cathedraId);
            return res.status(201).json({
                message: "Преподаватель был успешно добавлен в кафедру",
                ...teacherData
            })
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

module.exports = new TeacherController();