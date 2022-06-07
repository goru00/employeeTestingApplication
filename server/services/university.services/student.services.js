const StudentDto = require('../../dtos/university.dtos/student.dto');
const db = require('../../models');
const User = db.user;
const Group = db.group;

const userService = require('../user.services/user.service');

class StudentService {
    async createStudent(params) {
        const { userId, groupId } = params;
        const user = await User.findByPk(userId);
        const group = await Group.findByPk(groupId);
        user.setGroups(group);
        const studentDto = new StudentDto(user);
        studentDto.groups = [].push(group);
        return {
            student: studentDto
        }
    }

    async getStudentGroups(params) {
        const { userId } = params;
        const student = await User.findByPk(userId);
        const groups = await student.getGroups();
        const studentDto = new StudentDto(student);
        studentDto.groups = groups;
        return {
            ...studentDto
        }
    }

    async getStudentsOfTheGroup(params) {
        const { groupId } = params;
        const group = await Group.findByPk(groupId);
        const students = await group.getUsers();
        let studentsDto = [];
        for (let index = 0; index < students.length; index++) {
            studentsDto.push(new StudentDto(students[index]));
            studentsDto[index].groups = [groupId]
        }
        return {
            students: studentsDto
        }
    }

    async getStudents(params) {
        const studentsDto = await userService.getUsers({...params});
        let students = [];
        studentsDto.forEach(student => {
            if (student.roles.includes('Студент')) {
                students.push(student);
            }
        });
        return students; 
    }

}

module.exports = new StudentService();