const TeacherDto = require('../../dtos/university.dtos/teacher.dto');
const UserService = require('../user.services/user.service');
const db = require('../../models');
const Teacher = db.teacher;
const Op = db.Sequelize.Op;

class TeacherService {
    async createTeacher(props) {
        const { userId, tabNum, position, academic } = props;
        const teacher = await Teacher.create({
            userId: userId,
            tabNum: tabNum,
            position: position,
            academic: academic
        });
        const teacherDto = new TeacherDto(teacher);
        return {
            teacher: teacherDto
        }
    }
    async getTeachers(params) {
        const { position, academic, teacherName } = params;
        if (academic || position) {
            const teacher = await Teacher.findOne({
                where: {
                    [Op.or]: [
                        position,
                        academic
                    ]
                }
            });
            const teacherDto = new TeacherDto(teacher);
            return {
                teacher: teacherDto
            }
        }
        if (teacherName) {
            const user = await UserService.getUsers({name: teacherName});
            const teacher = await Teacher.findByPk(user.userId);
            const teacherDto = new TeacherDto(teacher);
            return {
                ...user,
                teacher: teacherDto
            }
        }
    }
}

module.exports = new TeacherService();