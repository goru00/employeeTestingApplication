module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("tests", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        teacherId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sectionId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        disciplineId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    }, {
        timeStamps: false
    });
    return Test;
}