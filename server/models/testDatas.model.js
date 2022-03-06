module.exports = (sequelize, Sequelize) => {
    const TestDatas = sequelize.define('test_datas', {
        testId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        sectionId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        questionId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
    return TestDatas;
}