const SectionService = require('../../services/test.services/section.service');

class SectionController {
    async createSection(req, res, next) {
        try {
            const sectionData = await SectionService.createSection({...req.body});
            return res.status(201).json({
                message: "Раздел был успешно создан",
                ...sectionData
            });
        } catch (err) {
            next(err);
        }
    }
    async getSections(req, res, next) {
        try {
            const sections = await SectionService.getSections({...req.params});
            return res.status(200).json(sections);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SectionController();