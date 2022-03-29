module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("tokens", {
        refreshToken: {
            type: Sequelize.STRING(312),
            allowNull: false
        },
    });
    return Token;
}