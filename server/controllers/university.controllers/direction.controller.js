const DirectionService = require('../../services/university.services/directon.service');

class DirectionController {
    async createDirection(req, res, next) {
        try {
            const directionData = await DirectionService.createDirection({...req.body});
            return res.status(201).json({
                message: "Направление было успешно создано",
                ...directionData
            });
        } catch (err) {
            next(err);
        }
    }
    async getDirectionsByCathedra(req, res, next) {
        try {
            const directions = await DirectionService.getDirectionsByCathedra({...req.params});
            return res.status(200).json(directions);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async getDirection(req, res, next) {
        try {
            const directions = await DirectionService.getDirection({...req.params});
            return res.status(200).json(directions);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new DirectionController();