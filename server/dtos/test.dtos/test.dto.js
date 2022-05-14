class TestDto {
    name;
    teacherId;
    sectionId;
    disciplineId;
    description;
    time;
    date;

    constructor(model) {
        this.name = model.name;
        this.teacherId = model.teacherId;
        this.sectionId = model.sectionId;
        this.disciplineId = model.disciplineId;
        this.description = model.description;
        this.time = model.time;
        this.date = model.date;
    }
}

module.exports = TestDto;