class DirectionDto {
    id;
    name;
    cathedraId;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.cathedraId = model.cathedraId;
    }
}

module.exports = DirectionDto;