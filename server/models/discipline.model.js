module.exports = (sequelize, Sequelize) => {
    const Discipline = sequelize.define("disciplines", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNULL: false
        }
    }, {
        timestamps: false
    });
    return Discipline;
}