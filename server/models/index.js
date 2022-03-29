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
db.token = require('./token.model')(sequelize, Sequelize);

//hasOne token
db.token.belongsTo(db.user, {
    foreignKey: 'userId'
});
db.user.hasOne(db.token, {
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

db.teacherEmployment = require('../models/teacherEmployment.model')(sequelize, Sequelize);

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

db.teacherEmployment.belongsTo(db.teacher, {
    foreignKey: 'teacherId',
    targetKey: 'userId'
});
db.teacher.hasMany(db.teacherEmployment, {
    foreignKey: 'teacherId',
    sourceKey: 'userId'
});
db.teacherEmployment.belongsTo(db.direction, {
    foreignKey: 'directionId',
    targetKey: 'id'
});
db.direction.hasMany(db.teacherEmployment, {
    foreignKey: 'directionId',
    sourceKey: 'id'
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

db.section = require('../models/section.model')(sequelize, Sequelize);
db.disciplineSections = require('../models/disciplineSection.model')(sequelize, Sequelize);

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

db.test = require('../models/test.model')(sequelize, Sequelize);

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
db.test.belongsTo(db.teacher, {
    foreignKey: 'teacherId',
    targetKey: 'userId'
});
db.teacher.hasMany(db.test, {
    foreignKey: 'teacherId',
    sourceKey: 'userId'
});

db.std = require('../models/sectionTestData.model')(sequelize, Sequelize);

db.section.hasMany(db.std, {
    foreignKey: 'sectionId',
    sourceKey: 'id'
});
db.std.belongsTo(db.section, {
    foreignKey: 'sectionId',
    targetKey: 'id'
});

db.studentAnswer = require('./studentAnswer.model')(sequelize, Sequelize);

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
db.studentAnswer.belongsTo(db.student, {
    foreignKey: 'studentId'
});
db.student.hasMany(db.studentAnswer, {
    foreignKey: 'studentId'
});

db.studentResult = require('./studentResult.model')(sequelize, Sequelize);

db.student.belongsToMany(db.test, {
    through: 'student_results',
    foreignKey: 'studentId',
    otherKey: 'testId'
});
db.test.belongsToMany(db.student, {
    through: 'student_results',
    foreignKey: 'testId',
    otherKey: 'studentId'
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

