const config = require('../configs/db.config');
const Sequelize = require('sequelize');

const { DB, USER, PASSWORD, HOST, pool, dialect } = config;

const sequelize = new Sequelize(
    DB,
    USER, 
    PASSWORD,
    {
        host: HOST,
        dialect: dialect,
        operatorsAliases: false,
        pool: {
            max: pool.max,
            min: pool.min,
            acquire: pool.acquire,
            idle: pool.idle
        }
    }
);

const db = {
    Sequelize,
    sequelize
};

db.user = require('../models/user.model')(sequelize, Sequelize);
db.role = require('../models/role.model')(sequelize, Sequelize);
db.position = require('../models/position.model')(sequelize, Sequelize);
db.test = require('../models/test.model')(sequelize, Sequelize);
db.testsEmployee = require('../models/testsEmployee.model')(sequelize, Sequelize);
db.testsData = require('../models/testsData.model')(sequelize, Sequelize);
db.section = require('../models/section.model')(sequelize, Sequelize);
db.refreshToken = require('../models/refreshToken.model')(sequelize, Sequelize);

//user_roles
db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
});
//user_positions
db.user.belongsToMany(db.position, {
    through: 'user_positions',
    foreignKey: 'userId',
    otherKey: 'positionId'
});
db.position.belongsToMany(db.user, {
    through: 'user_positions',
    foreignKey: 'positionId',
    otherKey: 'userId'
});
//ref sectionId test table
db.section.hasOne(db.test, {
    foreignKey: 'sectionId'
});
db.test.belongsTo(db.section, {
    foreignKey: 'sectionId'
});
//tests_employee
db.user.belongsToMany(db.test, {
    through: 'tests_employee',
    foreignKey: 'userId',
    otherKey: 'testId'
});
db.test.belongsToMany(db.user, {
    through: 'tests_employee',
    foreignKey: 'testId',
    otherKey: 'userId'
});
//ref testId tests_data table
db.test.hasMany(db.testsData, {
    as: "Datas"
});
//hasOne refreshToken
db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId'
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

