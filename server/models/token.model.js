module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("tokens", {
        refreshToken: {
            type: Sequelize.STRING(512),
            allowNull: false
        },
    });
    return Token;
}