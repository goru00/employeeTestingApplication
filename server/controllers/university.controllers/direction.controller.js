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
    async getDirections(req, res, next) {
        try {
            const directions = await DirectionService.getDirections({...req.params});
            return res.status(200).json(directions);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new DirectionController();