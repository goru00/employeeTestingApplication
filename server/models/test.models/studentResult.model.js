module.exports = (sequelize, Sequelize) => {
    const StudentResult = sequelize.define("student_results", {
        score: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Не пройден'
        },
        timeStart: {
            type: Sequelize.DATE
        },
        timeFinish: {
            type: Sequelize.DATE
        }
    }, {
        timeStamps: false
    });
    return StudentResult;
}