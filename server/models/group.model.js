const config 

module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNULL: false
        }
    },
    {
        timestamps: false
    });
    return Group;
}


