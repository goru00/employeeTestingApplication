class TeacherDto {
    userId;
    tabNum;
    position;
    academic;
    constructor(model) {
        this.userId = model.userId;
        this.tabNum = model.tabNum;
        this.position = model.position;
        this.academic = model.academic;
    }
}

module.exports = TeacherDto;