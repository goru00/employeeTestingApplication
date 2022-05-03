module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userId: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActivated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        activationLink: {
            type: Sequelize.STRING
        },
    });
    return User;
};
