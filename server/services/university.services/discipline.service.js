const DisciplineDto = require('../../dtos/university.dtos/discipline.dto');
const db = require('../../models');
const Discipline = db.discipline;

class DisciplineService {
    async createDiscipline(props) {
        const { disciplineName } = props;
        const discipline = await discipline
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
}

module.exports = new DisciplineService();