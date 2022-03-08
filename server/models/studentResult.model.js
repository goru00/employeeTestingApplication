module.exports = (sequelize, Sequelize) => {
    const studentTest = sequelize.define("student_results", {
        score: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        timeStart: {
            type: Sequelize.DATE
        },
        timeFinish: {
            type: Sequelize.DATE
        }
    });
    return studentTest;
}