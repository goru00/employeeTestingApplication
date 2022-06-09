module.exports = (sequelize, Sequelize) => {
    const DisciplineSections = sequelize.define('discipline_sections', {
        sectionId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        disciplineId: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    });
    return DisciplineSections;
}