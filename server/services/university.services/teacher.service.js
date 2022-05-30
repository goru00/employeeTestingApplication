const db = require('../../models');
const User = db.user; 
const Cathedra = db.cathedra;

const TeacherDto = require('../../dtos/university.dtos/teacher.dto');

const Op = db.Sequelize.Op;

const userService = require('../../services/user.services/user.service');

class TeacherService {
    async getTeachers(params) {
        const usersDto = await userService.getUsers({...params});
        let teachers = [];
        usersDto.forEach(user => {
            if (user.roles.includes('Преподаватель') || user.roles.include('Методист')) {
                teachers.push(user);
            }
        });
        return teachers;
    }
    async createTeacherOfTheCathedra(userId, cathedraId) {
        const user = await User.findByPk(userId);
        const cathedra = await Cathedra.findByPk(cathedraId);
        cathedra.setUsers(user);
        const teacherDto = new TeacherDto(user);
        teacherDto.cathedras = [cathedraId];
        return {
            teacher: teacherDto
        }
    }
    async getTeachersOfTheCathedra(params) {
        const { cathedraId } = params;
        const cathedra = await Cathedra.findByPk(cathedraId);
        const teachers = await cathedra.getUsers();
        let teachersDto = [];
        for (let index = 0; index < teachers.length; index++) {
            teachersDto.push(new TeacherDto(teachers[index]));
            teachersDto[index].cathedras = [cathedraId];
        }
        return {
            teachers: teachersDto
        }
    }
}

module.exports = new TeacherService();