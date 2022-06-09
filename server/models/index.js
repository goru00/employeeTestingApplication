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

db.user = require('./user.models/user.model')(sequelize, Sequelize);
db.token = require('./auth.models/token.model')(sequelize, Sequelize);

//hasOne token
db.token.belongsTo(db.user, {
    foreignKey: 'userId'
});
db.user.hasOne(db.token, {
    foreignKey: 'userId'
});

db.role = require('./user.models/role.model')(sequelize, Sequelize);

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

db.cathedra = require('./university.models/cathedra.model')(sequelize, Sequelize);
db.direction = require('./university.models/direction.model')(sequelize, Sequelize);

//ref cathedraId directions table
db.direction.belongsTo(db.cathedra, {
    foreignKey: 'cathedraId'
});

db.group = require('./university.models/group.model')(sequelize, Sequelize);

//ref group table -> direction table
db.group.belongsTo(db.direction, {
    foreignKey: 'directionId'
});
db.direction.hasOne(db.group, {
    foreignKey: 'directionId'
});

//student_groups
db.user.belongsToMany(db.group, {
    through: 'student_groups',
    foreignKey: 'studentId',
    otherKey: 'groupId'
});
db.group.belongsToMany(db.user, {
    through: 'student_groups',
    foreignKey: 'groupId',
    otherKey: 'studentId'
});

db.discipline = require('./university.models/discipline.model')(sequelize, Sequelize);

db.teacherEmployment = require('./university.models/teacherEmployment.model')(sequelize, Sequelize);

db.user.belongsToMany(db.cathedra, {
    through: 'teacher_cathedras',
    foreignKey: 'teacherId',
    otherKey: 'cathedraId'
});
db.cathedra.belongsToMany(db.user, {
    through: 'teacher_cathedras',
    foreignKey: 'cathedraId',
    otherKey: 'teacherId'
});

db.teacherEmployment.belongsTo(db.user, {
    foreignKey: 'teacherId',
    targetKey: 'userId'
});
db.user.hasMany(db.teacherEmployment, {
    foreignKey: 'teacherId',
    sourceKey: 'userId'
});
db.teacherEmployment.belongsTo(db.discipline, {
    foreignKey: 'disciplineId',
    targetKey: 'id'
});
db.discipline.hasMany(db.teacherEmployment, {
    foreignKey: 'disciplineId',
    sourceKey: 'id'
});

db.group.belongsToMany(db.discipline, {
    through: 'group_disciplines',
    foreignKey: 'groupId',
    otherKey: 'disciplineId'
});
db.discipline.belongsToMany(db.group, {
    through: 'group_disciplines', 
    foreignKey: 'disciplineId',
    otherKey: 'groupId'
});

db.section = require('./test.models/section.model')(sequelize, Sequelize);
db.disciplineSections = require('./test.models/disciplineSection.model')(sequelize, Sequelize);

//discipline_sections
db.discipline.belongsToMany(db.section, {
    through: db.disciplineSections,
    foreignKey: 'disciplineId',
    otherKey: 'sectionId'
});
db.section.belongsToMany(db.discipline, {
    through: db.disciplineSections,
    foreignKey: 'sectionId',
    otherKey: 'disciplineId'
});

db.test = require('./test.models/test.model')(sequelize, Sequelize);

//ref sectionId, disciplineId -> test table
db.test.belongsTo(db.discipline, {
    foreignKey: 'disciplineId',
    targetKey: 'id'
});
db.discipline.hasMany(db.test, {
    foreignKey: 'disciplineId',
    sourceKey: 'id'
});
db.test.belongsTo(db.section, {
    foreignKey: 'sectionId',
    targetKey: 'id'
});
db.section.hasMany(db.test, {
    foreignKey: 'sectionId',
    sourceKey: 'id'
});
db.test.belongsTo(db.user, {
    foreignKey: 'teacherId',
    targetKey: 'userId'
});
db.user.hasMany(db.test, {
    foreignKey: 'teacherId',
    sourceKey: 'userId'
});

db.std = require('./test.models/sectionTestData.model')(sequelize, Sequelize);

db.section.hasMany(db.std, {
    foreignKey: 'sectionId',
    sourceKey: 'id'
});
db.std.belongsTo(db.section, {
    foreignKey: 'sectionId',
    targetKey: 'id'
});

db.studentAnswer = require('./test.models/studentAnswer.model')(sequelize, Sequelize);

db.studentAnswer.belongsTo(db.std, {
    foreignKey: 'questionId'
});
db.std.hasMany(db.studentAnswer, {
    foreignKey: 'questionId'
});
db.studentAnswer.belongsTo(db.test, {
    foreignKey: 'testId'
});
db.test.hasMany(db.studentAnswer, {
    foreignKey: 'testId'
});
db.studentAnswer.belongsTo(db.user, {
    foreignKey: 'studentId'
});
db.user.hasMany(db.studentAnswer, {
    foreignKey: 'studentId'
});

db.studentResult = require('./test.models/studentResult.model')(sequelize, Sequelize);

db.user.belongsToMany(db.test, {
    through: 'student_results',
    foreignKey: 'studentId',
    otherKey: 'testId'
});
db.test.belongsToMany(db.user, {
    through: 'student_results',
    foreignKey: 'testId',
    otherKey: 'studentId'
});

db.ROLES = ["Администратор", "Методист", "Преподаватель", "Студент"];

module.exports = db;

