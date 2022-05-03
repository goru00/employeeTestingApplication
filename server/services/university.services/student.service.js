const StudentDto = require('../../dtos/university.dtos/student.dto');
const UserService = require('../user.services/user.service');
const db = require('../../models');
const Student = db.student;

class StudentService {
    async createStudent(props) {
        const { userId, tabNum } = props;
        const student = await Student.create({
            userId: userId,
            tabNum: tabNum
        });
        const studentDto = new StudentDto(student);
        return {
            student: studentDto
        }
    }
    async getStudent(params) {
        const { studentName } = params;
        if (studentName) {
            const user = await UserService.getUsers({name: studentName});
            const student = await Student.findByPk(user.userId);
            const studentDto = new StudentDto(student);
            return {
                ...user,
                student: studentDto
            }
        }
        const students = Student.findAll();
        let studentsDto = [];
        for (let index = 0; index < students.length; index++) {
            studentsDto.push(new StudentDto(students[index]));
        }
        return {
            students: studentsDto
        }
    }
}

module.exports = new StudentService();