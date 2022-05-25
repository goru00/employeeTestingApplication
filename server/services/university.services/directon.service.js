const DirectionDto = require('../../dtos/university.dtos/direction.dto');
const db = require('../../models');
const Op = db.Sequelize.Op;
const Direction = db.direction;

class DirectionService {
    async createDirection(props) {
        const { id, directionName, cathedraId } = props;
        const direction = await Direction.create({
            id: id,
            name: directionName,
            cathedraId: cathedraId
        });
        const directionDto = new DirectionDto(direction);
        return {
            direction: directionDto
        }
    }
    async getDirections(params) {
        const { cathedraId } = params;
        if (cathedraId) {
            const directions = await Direction.findAll({
                where: {
                    cathedraId: cathedraId
                }
            });
            let directionsDto = [];
            for (let index = 0; index < directions.length; index++) {
                directionsDto.push(new DirectionDto(directions[index]));
            }
            return {
                directions: directionsDto
            }
        }
        const directions = await Direction.findAll();
        let directionsDto = [];
        for (let index = 0; index < directions.length; index++) {
            directionsDto.push(new DirectionDto(directions[index]));
        }
        return {
            directions: directionsDto
        }
    }
}

module.exports = new DirectionService();