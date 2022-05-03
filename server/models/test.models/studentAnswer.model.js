module.exports = (sequelize, Sequelize) => {
    const StudentAnswer = sequelize.define("student_answers", {
        answer: {
            type: Sequelize.STRING
        },
        studentId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        questionId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        testId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        timeStamps: false
    });
    return StudentAnswer;
}
