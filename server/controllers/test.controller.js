const db = require('../models');
const Test = db.test;
const TestData = db.testDatas;
const Section = db.section;
const Group = db.group;
const Student = db.student;
const StudentTest = db.studentTest;
const Discipline = db.discipline;
const Std = db.std;
const Op = db.Sequelize.Op;

class TestController {
    async getSections(req, res) {
        Section.findAll().then(sections => {
            if (!sections) {
                res.status(200).send({
                    message: "По вашему запросу не было найдено ни одной записи"
                });
            }
            res.status(200).send(sections);
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    } 
    async createSection(req, res) {
        Section.create({
            name: req.body.sectionName,
            description: req.body.description
        }).then(section => {
            Discipline.findOne({
                where: {
                    name: req.body.disciplineName
                }
            }).then(discipline => {
                discipline.setSections(section).then(() => {
                    res.status(201).send({
                        message: "Раздел теста был успешно добавлен"
                    });
                });
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async getTests(req, res) {
        Test.findAll().then(tests => {
            if (!tests) {
                res.status(200).send({
                    message: "По Вашему запросу не было найдено ни одного теста"
                });
            }
            res.status(200).send(tests);
        })
    }
    async createTest(req, res) {
        Discipline.findOne({
            where: {
                name: req.body.disciplineName
            }
        }).then(discipline => {
            Section.findOne({
                where: {
                    name: req.body.sectionName
                }
            }).then(section => {
                Test.create({
                    sectionId: section.id,
                    disciplineId: discipline.id,
                    time: req.body.time,
                    date: req.body.date,
                    name: req.body.name,
                    description: req.body.description
                }).then(test => {
                    if (req.body.questions) {
                        for (let index = 0; index < questions.length; index++) {
                            Std.create({
                                sectionId: section.id,
                                question: req.body.questions[index],
                                answers: req.body.answers[index],
                                tAnswers: req.body.tAnswers[index]
                            }).then(std => {
                                TestData.create({
                                    testId: test.id,
                                    sectionId: std.sectionId,
                                    questionId: std.questionId
                                });
                            });
                        }
                    }
                    let candidates = [];
                    if (req.body.groups || req.body.students) {
                        Group.findAll({
                            where: {
                                name: {
                                    [Op.or]: req.body.groups
                                }
                            }
                        }).then(async groups => {
                            for (let index = 0; index < groups.length; index++) {
                                await Student.findAll({
                                    where: {
                                        groupId: {
                                            [Op.or]: groups[index].id
                                        }
                                    }
                                }).then(async students => {
                                    await students.forEach(student => {
                                        candidates.push(student);
                                    })
                                })
                            }
                            if (req.body.students) {
                                Student.findAll({
                                    where: {
                                        name: {
                                            [Op.or]: req.body.students
                                        }
                                    }
                                }).then(async students => {
                                    await students.forEach(student => {
                                        candidates.push(student);
                                    });
                                    if (candidates) {
                                        candidates.forEach(candidate => {
                                            test.setSts(candidate);
                                        });
                                    }
                                    res.status(201).send({
                                        message: "Тест был успешно добавлен"
                                    });
                                });
                            }
                        });
                    }
                });
            });
        });
    }
}

module.exports = new TestController();