module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
        tabNum: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Student;
}