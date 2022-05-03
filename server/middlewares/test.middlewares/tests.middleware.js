const db = require('../../models');
const Section = db.section;
const Test = db.test;

class Tests {
    async checkDuplicateSectionName(req, res, next) {
        Section.findOne({
            where: {
                name: req.body.name
            }
        }).then(section => {
            if (section) {
                res.status(400).send({
                    message: "Ошибка! Раздел уже существует"
                });
                return;
            }
            next();
        });
    }
    checkSectionIdExists(req, res, next) {
        Section.findByPk(req.body.sectionId).then(section => {
            if (section) {
                next();
                return;
            }
            res.status(403).send({
                message: "Данного раздела не существует для создания теста"
            });
            return;
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async checkEqLengthQuestionsAndAnswers(req, res, next) {
        if (req.body.questions.length !== req.body.answers.length) {
            res.status(403).send({
                message: "Количество ответов при создании теста должно совпадать с количеством вопросов"
            });
            return;
        }
        next();
    }
    async checkDuplicateTestName(req, res, next) {
        Test.findOne({
            where: {
                name: req.body.name
            }
        }).then(test => {
            if (test) {
                res.status(400).send({
                    message: "Ошибка! Тест с таким наименованием уже существует"
                });
                return;
            }
            next();
        });
    }
}

module.exports = new Tests();