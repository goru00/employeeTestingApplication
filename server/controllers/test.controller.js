const db = require('../models');
const Test = db.test;
const User = db.user;
const Position = db.position;
const Employee = db.testsEmployee;
const Op = db.Sequelize.Op;
const TestsData = db.testsData;

class TestController {
    async get(req, res) {
        const { flag } = req.params;
        if (!!flag) {
            Employee.findAll({
                where: {
                    userId: req.userId,
                    state: flag
                }
            }).then(tests => {
                if (!tests) {
                    return res.send({
                        message: "Тестов соответствующих запросу нет"
                    });
                }
                res.send(tests);
            });
        } else {
            Test.findAll().then(tests => {
                if (!tests) {
                    return res.send({
                        message: "В данный момент тестов нет"
                    });
                }
                res.send(tests);
            })
        }
    }
    async create(req, res) {
        const { positions, questions, answers, users } = req.body;
        Test.create({
            sectionId: req.body.sectionId,
            name: req.body.name,
            description: req.body.description,
            time: req.body.time,
            date: req.body.date
        }).then(test => {
            for (let index = 0; index < questions.length; index++) {
                TestsData.create({
                    testId: test.id,
                    question: questions[index],
                    answer: answers[index]
                }).then(res => {
                    console.log(res);
                });
            }
            if (positions) {
                let candidates = [];
                Position.findAll({
                    where: {
                        name: {
                            [Op.or]: positions
                        }
                    }
                }).then(async positions => {
                    for (let index = 0; index < positions.length; index++) {
                        await positions[index].getUsers().then(users => {
                            users.forEach(user => {
                                if (!candidates.includes(user.username)) {
                                    candidates.push(user.username);
                                }
                            });
                        });
                    }
                    test.setUsers(candidates).then(() => {
                        res.send({
                            message: "Тест успешно добавлен"
                        });
                    });
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
}

module.exports = new TestController();