const CathedraDto = require('../../dtos/university.dtos/cathedra.dto');
const db = require('../../models');
const Cathedra = db.cathedra;

class CathedraService {
    async createCathedra(props) {
        const { cathedraName } = props;
        const cathedra = await Cathedra.create({
            name: cathedraName
        });
        const cathedraDto = new CathedraDto(cathedra);
        return {
            cathedra: cathedraDto
        }
    }
    async getCathedras(params) {
        const { cathedraName } = params;
        if (cathedraName) {
            const cathedra = await Cathedra.findOne({
                where: {
                    name: cathedraName
                }
            });
            const cathedraDto = new CathedraDto(cathedra);
            return {
                cathedra: cathedraDto
            }
        }
        const cathedras = await Cathedra.findAll();
        let cathedrasDto = [];
        for (let index = 0; index < cathedras.length; index++) {
            cathedrasDto.push(new CathedraDto(cathedras[index]));
        }
        return {
            cathedras: cathedrasDto
        }
    }
}

module.exports = new CathedraService();