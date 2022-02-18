module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define('section', {
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
        }
    }, {
        timestamps: false
    });
    return Section;
}