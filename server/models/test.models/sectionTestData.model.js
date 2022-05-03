module.exports = (sequelize, Sequelize) => {
    const STD = sequelize.define("stds", {
        sectionId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        questionId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: Sequelize.STRING,
            allowNull: false
        },
        answer: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tAnswer: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    return STD;
}