module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teachers", {
        userId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        tabNum: {
            type: Sequelize.STRING,
            allowNull: false
        },
        position: {
            type: Sequelize.STRING,
            allowNull: false
        },
        academic: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Teacher;
}