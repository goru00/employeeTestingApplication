module.exports = (sequelize, Sequelize) => {
    const TestsData = sequelize.define('tests_data', {
        testId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        sectionId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        idQuestion: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        question: {
            type: Sequelize.STRING
        },
        answer: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return TestsData;
}