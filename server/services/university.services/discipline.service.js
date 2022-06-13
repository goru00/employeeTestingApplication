const DisciplineDto = require('../../dtos/university.dtos/discipline.dto');
const db = require('../../models');
const Group = db.group;
const User = db.user;
const Discipline = db.discipline;

const Op = db.Sequelize.Op;

class DisciplineService {
    async createDiscipline(params) {
        const { id, name } = params;
        const discipline = await Discipline.create({
            id: id,
            name: name
        });
        const disciplineDto = new DisciplineDto(discipline);
        return {
            ...disciplineDto
        }
    }

    async createDisciplineOfTheGroup(params) {
        const { disciplineId, groupId } = params;
        const discipline = await Discipline.findByPk(disciplineId);
        discipline.setGroups(groupId);
        const disciplineDto = new DisciplineDto(discipline);
        return {
            ...disciplineDto
        }
    }

    async getDisciplines() {
        const disciplines = await Discipline.findAll();
        let disciplinesDto = [];
        for (let index = 0; index < disciplines.length; index++) {
            disciplinesDto.push(new DisciplineDto(disciplines[index]));
        }
        return {
            disciplines: disciplinesDto
        }
    }

    async getDiscipline(params) {
        const { id } = params;
        const discipline = await Discipline.findByPk(id);
        const disciplineDto = new DisciplineDto(discipline);
        return {
            ...disciplineDto
        }
    }

    async getDisciplinesOfTheGroup(params) {
        const { groupId } = params;
        const group = await Group.findByPk(groupId);
        const disciplines = await group.getDisciplines();
        let disciplinesDto = [];
        for (let index = 0; index < disciplines.length; index++) {
            disciplinesDto.push(new DisciplineDto(disciplines[index]));
        }
        return {
            disciplines: disciplinesDto
        }
    }

    async getDisciplinesOfTheTeacher(params) {
        const { userId } = params;
        const user = await User.findByPk(userId);
        const disciplines = await user.getDisciplines();
        let disciplinesDto = [];
        for (let index = 0; index < disciplines.length; index++) {
            disciplinesDto.push(new DisciplineDto(disciplines[index]));
        }
        return {
            disciplines: disciplinesDto
        }
    }

}

module.exports = new DisciplineService();