const CathedraService = require('../../services/university.services/cathedra.service');

class CathedraController 
{
    async createCathedra(req, res, next) {
        try {
            const cathedraData = await CathedraService.createCathedra({...req.body});
            return res.status(201).json({
                message: "Кафедра была успешна создана",
                ...cathedraData
            });
        } catch (err) {
            next(err);
        }
    }
    async getCathedras(req, res, next) {
        try {
            const cathedras = await CathedraService.getCathedras({...req.params});
            return res.status(200).json(cathedras);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CathedraController();