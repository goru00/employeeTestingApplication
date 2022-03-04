module.export = (sequelize, Sequelize) => {
    const studentTest = sequelize.define("student_tests", {
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
    });
    return studentTest;
}