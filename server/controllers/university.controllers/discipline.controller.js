const DisciplineService = require('../../services/university.services/discipline.service');

class DisciplineController {
    async createDiscipline(req, res, next) {
        try {
            const disciplineData = await DisciplineService.createDiscipline({...req.body});
            return res.status(201).json({
                message: "Дисциплина была успешно создана",
                ...disciplineData
            });            
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    async createDisciplineOfTheGroup(req, res, next) {
        try {
            const disciplineData = await DisciplineService.createDisciplineOfTheGroup({...req.body, ...req.params});
            return res.status(201).json({
                message: "Дисциплина была успешно добавлена в группу",
                ...disciplineData
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getDiscipline(req, res, next) {
        try {
            const discipline = await DisciplineService.getDiscipline({...req.params});
            return res.status(200).json(discipline);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getDisciplines(req, res, next) {
        try {
            const disciplines = await DisciplineService.getDisciplines({...req.params});
            return res.status(200).json(disciplines);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getDisciplinesOfTheGroup(req, res, next) {
        try {
            const disciplines = await DisciplineService.getDisciplinesOfTheGroup({...req.params});
            return res.status(200).json(disciplines);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = new DisciplineController();