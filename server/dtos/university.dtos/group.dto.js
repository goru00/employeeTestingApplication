class GroupDto {
    id;
    directionId;
    constructor(model) {
        this.id = model.id;
        this.directionId = model.directionId;
    }
}

module.exports = GroupDto;