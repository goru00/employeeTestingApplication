class SectionDto {
    id;
    name;
    description;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
    }
}

module.exports = SectionDto;