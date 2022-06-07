class StudentDto {
    userId;
    name;
    groups = null;

    constructor(model) {
        this.userId = model.userId;
        this.name = model.name;
    }
}

module.exports = StudentDto;