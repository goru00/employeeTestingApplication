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
db.testDatas = require('../models/testDatas.model')(sequelize, Sequelize);
db.test = require('../models/test.model')(sequelize, Sequelize);
db.direction = require('../models/direction.model')(sequelize, Sequelize);
db.discipline = require('../models/discipline.model')(sequelize, Sequelize);
db.disciplineSections = require('../models/disciplineSection.model')(sequelize, Sequelize);
db.teacher = require('../models/teacher.model')(sequelize, Sequelize);
db.student = require('../models/student.model')(sequelize, Sequelize);
db.studentTest = require('../models/studentTest.model')(sequelize, Sequelize);
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

//ref cathedraId directions table
db.direction.belongsTo(db.cathedra, {
    foreignKey: 'cathedraId'
});

//ref student table -> user table
db.student.belongsTo(db.user, {
    foreignKey: 'userId'
});
db.user.hasOne(db.student, {
    foreignKey: 'userId'
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
    as: 'sts',
    through: 'student_tests',
    foreignKey: 'studentId',
    otherKey: 'testId'
});
db.test.belongsToMany(db.student, {
    as: 'sts',
    through: 'student_tests',
    foreignKey: 'testId',
    otherKey: 'studentId'
});

//ref section_testDatas -> sections table
db.std.belongsTo(db.section, {
    foreignKey: 'sectionId'
});
db.section.hasMany(db.std, {
    foreignKey: 'sectionId'
});

//ref testId, sectionId, questionId -> test_datas table
db.testDatas.belongsTo(db.test, {
    foreignKey: 'testId'
});
db.test.hasMany(db.testDatas, {
    foreignKey: 'testId'
});
db.testDatas.belongsTo(db.std, {
    foreignKey: 'sectionId'
});
db.std.hasMany(db.testDatas, {
    foreignKey: 'sectionId'
});
db.testDatas.belongsTo(db.std, {
    foreignKey: 'questionId'
});
db.std.hasMany(db.testDatas, {
    foreignKey: 'questionId'
});

//ref sectionId, disciplineId -> test table
db.test.belongsTo(db.disciplineSections, {
    foreignKey: 'sectionId'
});
db.disciplineSections.hasMany(db.test, {
    foreignKey: 'sectionId'
});
db.test.belongsTo(db.disciplineSections, {
    foreignKey: 'disciplineId'
});
db.disciplineSections.hasMany(db.test, {
    foreignKey: 'disciplineId'
});

//ref student table -> user table
db.student.belongsTo(db.user, {
    foreignKey: 'userId'
});
db.user.hasOne(db.student, {
    foreignKey: 'userId'
});

//ref group table -> direction table
db.group.belongsTo(db.direction, {
    foreignKey: 'directionId'
});
db.direction.hasOne(db.group, {
    foreignKey: 'directionId'
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
    foreignKey: 'userId'
});
db.user.hasOne(db.teacher, {
    foreignKey: 'userId'
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

