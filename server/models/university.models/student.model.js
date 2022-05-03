module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
        userId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        tabNum: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Student;
}