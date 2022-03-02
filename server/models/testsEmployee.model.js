module.exports = (sequelize, Sequelize) => {
    const TestsEmployee = sequelize.define("tests_employee", {
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
    }, {
        timestamps: false
    });
    return TestsEmployee;
}