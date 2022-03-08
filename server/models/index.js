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
db.refreshToken = require('../models/refreshToken.model')(sequelize, Sequelize);

//hasOne refreshToken
db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId'
});

db.role = require('../models/role.model')(sequelize, Sequelize);

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

db.cathedra = require('../models/cathedra.model')(sequelize, Sequelize);
db.direction = require('../models/direction.model')(sequelize, Sequelize);

//ref cathedraId directions table
db.direction.belongsTo(db.cathedra, {
    foreignKey: 'cathedraId'
});

db.group = require('../models/group.model')(sequelize, Sequelize);

//ref group table -> direction table
db.group.belongsTo(db.direction, {
    foreignKey: 'directionId'
});
db.direction.hasOne(db.group, {
    foreignKey: 'directionId'
});

db.student = require('../models/student.model')(sequelize, Sequelize);

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

db.teacher = require('../models/teacher.model')(sequelize, Sequelize);

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
db.cathedra.belongsToMany(db.teacher, {
    through: 'teacher_cathedras',
    foreignKey: 'cathedraId',
    otherKey: 'teacherId'
});

db.discipline = require('../models/discipline.model')(sequelize, Sequelize);

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
db.section = require('../models/section.model')(sequelize, Sequelize);
db.disciplineSections = require('../models/disciplineSection.model')(sequelize, Sequelize);

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

db.test = require('../models/test.model')(sequelize, Sequelize);

//ref sectionId, disciplineId -> test table

db.test.hasMany(db.disciplineSections, {
    foreignKey: 'sectionId'
});
db.disciplineSections.belongsTo(db.test, {
    foreignKey: 'sectionId'
});

db.std = require('../models/sectionTestData.model')(sequelize, Sequelize);
db.testDatas = require('../models/testDatas.model')(sequelize, Sequelize);
db.studentAnswer = require('./studentAnswer.model')(sequelize, Sequelize);
db.studentResult = require('./studentResult.model')(sequelize, Sequelize);

//student_tests
db.student.belongsToMany(db.test, {
    as: 'str',
    through: 'student_results',
    foreignKey: 'studentId',
    otherKey: 'testId'
});
db.test.belongsToMany(db.student, {
    as: 'str',
    through: 'student_results',
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

//ref student_answers -> test_datas

//ref testId, sectionId, questionId -> test_datas table
db.testDatas.belongsTo(db.test, {
    foreignKey: 'testId'
});
db.test.hasOne(db.testDatas, {
    foreignKey: 'testId'
});
db.testDatas.belongsTo(db.std, {
    foreignKey: 'sectionId'
});
db.std.hasOne(db.testDatas, {
    foreignKey: 'sectionId'
});
db.testDatas.belongsTo(db.std, {
    foreignKey: 'questionId'
});
db.std.hasOne(db.testDatas, {
    foreignKey: 'questionId'
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

