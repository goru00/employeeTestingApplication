const SectionDto = require('../../dtos/test.dtos/section.dto');
const db = require('../../models');
const Section = db.section;
const Discipline = db.discipline;

class SectionService {
    async createSection(params) {
        const { id, name, description, disciplineId } = params;
        const section = await Section.create({
            id: id,
            name: name,
            description: description
        });
        const discipline = await Discipline.findByPk(disciplineId);
        section.setDisciplines(discipline);
        const sectionDto = new SectionDto(section);
        return {
            ...sectionDto
        }
    }

    async getSectionsOfTheDiscipline(disciplineId) {
        const discipline = await Discipline.findByPk(disciplineId);
        const sections = await discipline.getSections();
        let sectionsDto = [];
        for (let index = 0; index < sections.length; index++) {
            sectionsDto.push(new SectionDto(sections[index]));
        }
        console.log(sectionsDto);
        return {
            sections: sectionsDto
        }
    } 

    async getSections(params) {
        const { id, sectionName } = params;
        if (id) {
            const section = await Section.findByPk(id);
            const sectionDto = new SectionDto(section);
            return {
                section: sectionDto
            }
        }
        if (sectionName) {
            const section = await Section.findOne({
                where: {
                    name: sectionName
                }
            });
            const sectionDto = new SectionDto(section);
            return {
                section: sectionDto
            }
        }
        const sections = await Section.findAll();
        let sectionsDto = [];
        for (let index = 0; index < sections.length; index++) {
            sectionsDto.push(new SectionDto(sections[index]));
        }
        return {
            sections: sectionsDto
        }
    }
}

module.exports = new SectionService();