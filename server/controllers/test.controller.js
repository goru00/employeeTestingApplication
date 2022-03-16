const db = require('../models');
const Test = db.test;
const Section = db.section;
const Group = db.group;
const Student = db.student;
const StudentResult = db.studentResult;
const StudentAnswer = db.studentAnswer;
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
        console.log(req.body.nameTest + "\n" + req.body.time);
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
                    teacherId: req.userId,
                    time: req.body.time,
                    date: req.body.date,
                    name: req.body.nameTest,
                    description: req.body.description
                }).then(test => {
                    if (req.body.groups || req.body.students) {
                        let candidates = [];
                        Group.findAll({
                            where: {
                                name: {
                                    [Op.or]: req.body.groups
                                }
                            }
                        }).then(async groups => {
                            await groups.forEach(group => {
                                group.getStudents().then(students => {
                                    students.forEach(student => {
                                        if (!candidates.includes(student)) candidates.push(student);
                                    })
                                });
                            });
                            if (req.body.students) {
                                Student.findAll({
                                    where: {
                                        name: {
                                            [Op.or]: req.body.students
                                        }
                                    }
                                }).then(async () => {
                                    for (let index = 0; index < req.body.questions.length; index++) {
                                        const std = await Std.create({
                                            sectionId: section.id,
                                            question: req.body.questions[index],
                                            answer: req.body.answers[index],
                                            tAnswer: req.body.tAnswers[index]
                                        });
                                        candidates.forEach(candidate => {
                                            StudentAnswer.create({
                                                testId: test.id,
                                                questionId: std.questionId,
                                                studentId: candidate.userId
                                            });
                                        });
                                    }
                                    candidates.forEach(candidate => {
                                        StudentResult.create({
                                            testId: test.id,
                                            studentId: candidate.userId
                                        });
                                    });
                                    res.status(201).send({
                                        message: "Тест успешно добавлен"
                                    });
                                });
                            }
                        });
                    }
                });
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async getResult(req, res) {
        StudentResult.findOne({
            where: {
                studentId: req.userId,
                testId: req.params.testId
            }
        }).then(result => {
            Test.findByPk(result.testId).then(test => {
                res.status(200).send({
                    name: test.name,
                    description: test.description,
                    time: test.time,
                    date: test.date,
                    timeStart: result.timeStart,
                    finishTest: result.finishTest,
                    score: result.score
                });
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async startTest(req, res) {
        StudentResult.update({
            state: 'В процессе',
            timeStart: new Date()
        }, {
            where: {
                studentId: req.userId,
                testId: req.params.testId
            }
        }).then(result => {
            if (result) {
                StudentAnswer.findAll({
                    where: {
                        testId: req.params.testId,
                        studentId: req.userId
                    }
                }).then(async studentQuestions => {
                    Std.findAll({
                        where: {
                            questionId: {
                                [Op.or]: studentQuestions.questionId
                            }
                        }
                    }).then(data => {
                        let qData = [];
                        for (let index = 0; index < data.length; index++) {
                            qData.push({
                                id: data[index].questionId,
                                question: data[index].question,
                                answers: data[index].answer
                            });
                        }
                        res.status(201).send(qData);
                    });
                });
            } else {
                res.status(404).send({
                    message: "Ошибка! Тест не был найден"
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async finishTest(req, res) {
        let score = 0;
        await req.body.questionsId.forEach((questionId, index) => {
            StudentAnswer.update({
                answer: req.body.answers[index]
            }, {
                where: {
                    studentId: req.userId,
                    testId: req.params.testId,
                    questionId: questionId
                }
            }).then(async () => {
                await Std.findOne({
                    where: {
                        questionId: questionId
                    }
                }).then(std => {
                    if (std.tAnswer === req.body.answers[index]) {
                        console.log('ok');
                        score++;
                    }
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message
                    });
                });
            });
        });
        StudentResult.update({
            score: Integer(Math.ceil(score / req.body.questionsId.length * 100)),
            state: 'Пройдено',
            timeFinish: new Date()
        }, {
            where: {
                studentId: req.userId,
                testId: req.params.testId
            }
        }).then(result => {
            res.status(201).send({
                message: "Тест был пройден",
                score: result.score
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
}

module.exports = new TestController();