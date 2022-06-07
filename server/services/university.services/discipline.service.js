const DisciplineDto = require('../../dtos/university.dtos/discipline.dto');
const db = require('../../models');
const Group = db.group;
const Discipline = db.discipline;
const Direction = db.direction;

class DisciplineService {
    async createDiscipline(params) {
        const { disciplineName } = params;
        const discipline = await Discipline.create({
            name: disciplineName
        });
        const disciplineDto = new DisciplineDto(discipline);
        return {
            ...disciplineDto
        }
    }

    async createDisciplineOfTheDirection(params) {
        const { directionId, disciplineId } = params;
        const direction = await Direction.findByPk(directionId);
        const discipline = await Discipline.findByPk(disciplineId);
        direction.setDisciplines(discipline);
        const disciplineDto = new DisciplineDto(discipline);
        return {
            ...disciplineDto
        }
    }

    async getDisciplines(params) {
        const { disciplineName } = params;
        if (disciplineName) {
            const discipline = await Discipline.findOne({
                where: {
                    name: disciplineName
                }
            });
            const disciplineDto = new DisciplineDto(discipline);
            return {
                discipline: disciplineDto
            } 
        }
        const disciplines = await Discipline.findAll();
        let disciplinesDto = [];
        for (let index = 0; index < disciplines.length; index++) {
            disciplinesDto.push(new DisciplineDto(disciplines[index]));
        }
        return {
            disciplines: disciplinesDto
        }
    }

    async getDisciplinesOfTheGroup(params) {
        const { groupId } = params;
        const group = await Group.findByPk(groupId);
        const disciplines = group.getDisciplines();
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