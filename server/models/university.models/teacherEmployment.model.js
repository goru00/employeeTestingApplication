module.exports = (sequelize, Sequelize) => {
    const TeacherEmployment = sequelize.define('teacher_employments', {
        teacherId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        disciplineId: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    }, {
        timeStamps: false
    });
    return TeacherEmployment;
}