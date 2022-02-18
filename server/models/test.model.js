module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("tests", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            type: Sequelize.DATE(6),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    return Test;
}