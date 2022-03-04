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
db.test = require('../models/test.model')(sequelize, Sequelize);
db.direction = require('../models/direction.model')(sequelize, Sequelize);
db.discipline = require('../models/discipline.model')(sequelize, Sequelize);
db.teacher = require('../models/teacher.model')(sequelize, Sequelize);
db.student = require('../models/student.model')(sequelize, Sequelize);
db.group = require('../models/group.model')(sequelize, Sequelize);
db.std = require('../models/sectionTestData.model')(sequelize, Sequelize);
db.cathedra = require('../models/cathedra.model')(sequelize, Sequelize);
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

//cathedra_directions
db.cathedra.belongsToMany(db.direction, {
    through: 'cathedra_directions',
    foreignKey: 'cathedraId',
    otherKey: 'directionId'
});
db.direction.belongsToMany(db.cathedra, {
    through: 'cathedra_directions',
    foreignKey: 'directionId',
    otherKey: 'cathedraId'
});

//discipline_sections
db.discipline.belongsToMany(db.section, {
    through: 'discipline_sections',
    foreignKey: 'disciplineId',
    otherKey: 'sectionId'
});
db.section.belongsToMany(db.discipline, {
    through: 'discipline_sections',
    foreignKey: 'sectionId',
    otherKey: 'disciplineId'
});

//direction_disciplines
db.direction.belongsToMany(db.discipline, {
    through: 'direction_disciplines',
    foreignKey: 'directionId',
    otherKey: 'disciplineId'
});
db.discipline.belongsToMany(db.direction, {
    through: 'direction_disciplines',
    foreignKey: 'disciplineId',
    otherKey: 'directionId'
});

//student_tests
db.student.belongsToMany(db.test, {
    through: 'student_tests',
    foreignKey: 'studentId',
    otherKey: 'testId'
});
db.test.belongsToMany(db.student, {
    through: 'student_tests',
    foreignKey: 'testId',
    otherKey: 'studentId'
});

//ref section_testDatas -> sections table
db.std.belongsTo(db.section, {
    as: 'stds',
    foreignKey: 'sectionId'
});
db.section.hasMany(db.std, {
    foreignKey: 'sectionId'
});

//ref sectionId test table
db.section.hasOne(db.test, {
    foreignKey: 'sectionId'
});
db.test.belongsTo(db.section, {
    foreignKey: 'sectionId'
});

//ref student table -> user table
db.student.belongsTo(db.user, {
    foreignKey: 'userId'
});
db.user.hasOne(db.student, {
    foreignKey: 'userId'
});

//student_groups
db.student.belongsToMany(db.group, {
    through: 'student_groups',
    foreignKey: 'studentId',
    otherKey: 'groupId'
});
db.group.belongsToMany(db.student, {
    through: 'student_groups',
    foreignKey: 'groupId',
    otherKey: 'studentId'
});

//ref teacher table -> user table
db.teacher.belongsTo(db.user, {
    foreignKey: 'teacherId'
});
db.user.hasOne(db.teacher, {
    foreignKey: 'teacherId'
});

//teacher_cathedras
db.teacher.belongsToMany(db.cathedra, {
    through: 'teacher_cathedras',
    foreignKey: 'teacherId',
    otherKey: 'cathedraId'
});
db.user.belongsToMany(db.teacher, {
    through: 'teacher_cathedras',
    foreignKey: 'cathedraId',
    otherKey: 'teacherId'
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

