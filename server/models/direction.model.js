module.exports = (sequelize, Sequelize) => {
    const Direction = sequelize.define("directions", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Direction;
}