module.exports = (sequelize, Sequelize) => {
    const TestData = sequelize.define("tests_employee", {
        score: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        timeStart: {
            type: Sequelize.DATE,
            allowNull: false
        },
        timeFinish: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return TestData;
}