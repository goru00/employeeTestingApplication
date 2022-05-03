module.exports = (sequelize, Sequelize) => {
    const Cathedra = sequelize.define("cathedras", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Cathedra;
}