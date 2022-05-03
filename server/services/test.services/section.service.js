const SectionDto = require('../../dtos/test.dtos/section.dto');
const db = require('../../models');
const Section = db.section;

class SectionService {
    async createSection(props) {
        const { sectionName } = props;
        const section = await Section.create({
            name: sectionName
        });
        const sectionDto = new SectionDto(section);
        return {
            section: sectionDto
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