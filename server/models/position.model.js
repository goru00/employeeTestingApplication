module.exports = (sequelize, Sequelize) => {
    const Position = sequelize.define("positions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Position;
}