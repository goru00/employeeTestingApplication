class CathedraDto {
    id;
    name;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
    }
}

module.exports = CathedraDto;