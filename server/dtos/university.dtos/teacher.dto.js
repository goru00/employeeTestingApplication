class TeacherDto {
    userId;
    name;
    cathedras = null;
    directions = null;
    disciplines = null;

    constructor(model) {
        this.userId = model.userId;
        this.name = model.name;
    }
}

module.exports = TeacherDto;