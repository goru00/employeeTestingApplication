const SectionService = require('../../services/university.services/section.service');

class SectionController {
    async createSection(req, res, next) {
        try {
            const sectionData = await SectionService.createSection({...req.body, ...req.params});
            return res.status(201).json({
                message: "Раздел был успешно создан",
                ...sectionData
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getSectionsOfTheDiscipline(req, res, next) {
        try {
            const sections = await SectionService.getSectionsOfTheDiscipline(req.params.disciplineId);
            return res.status(200).json(sections);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getSections(req, res, next) {
        try {
            const sections = await SectionService.getSections({...req.params});
            return res.status(200).json(sections);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = new SectionController();