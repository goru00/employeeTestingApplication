class GroupDto {
    id;
    name;
    directionId;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.directionId = model.directionId;
    }
}

module.exports = GroupDto;