module.exports = (sequelize, Sequelize) => {
    const StudentAnswer = sequelize.define("student_answers", {
        testId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        sectionId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        questionId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        answer: {
            type: Sequelize.STRING
        }
    });
    return StudentAnswer;
}
