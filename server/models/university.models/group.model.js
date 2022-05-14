module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        id: {
            type: Sequelize.STRING,
            allowNULL: false,
            primaryKey: true,
        }
    },
    {
        timestamps: false
    });
    return Group;
}


