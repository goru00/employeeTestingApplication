class StudentDto {
    userId;
    tabNum;
    constructor(model) {
        this.userId = model.userId;
        this.tabNum = model.tabNum;
    }
}

module.exports = StudentDto;