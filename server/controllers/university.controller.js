const db = require('../models');
const Cathedra = db.cathedra;
const Direction = db.direction;
const Student = db.student;
const User = db.user;
const Group = db.group;

class UniversityController
{
    async createStudent(req, res) {
        User.findOne({
            where: {
                name: req.body.name
            }
        }).then(name => {
            Student.create({
                id: name.id,
                tabNum: req.body.tabNum
            }).then(student => {
                Group.findOne({
                    where: {
                        name: req.body.groupName
                    }
                }).then(group => {
                    group.setStudents(student).then(() => {
                        res.status(201).send({
                            message: "Студент был успешно создан"
                        });
                    });
                });
            })
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async getCathedras(req, res) {
        Cathedra.findAll().then(cathedras => {
            if (!cathedras) {
                res.status(200).send({
                    message: "По Вашему запросу не найдено ни одной кафедры"
                });
            }
            res.status(200).send(cathedras);
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async createCathedra(req, res) {
        Cathedra.create({
            name: req.body.name
        }).then(() => {
            res.status(201).send({
                message: "Кафедра была успешно создана"
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async getDirections(req, res) {
        Direction.findAll().then(directions => {
            if (!directions) {
                res.status(200).send({
                    message: "По вашему запросу не найдено ни одного направления"
                });
            }
            res.status(200).send(directions);
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async createDirection(req, res) {
        Cathedra.findOne({
            where: {
                name: req.body.cathedraName
            }
        }).then(cathedra => {
            Direction.create({
                id: req.body.id,
                name: req.body.directionName,
                cathedraId: cathedra.id
            }).then(() => {
                res.status(201).send({
                    message: "Дисциплина была успешно создана"
                });
            }).catch(err => {
                return res.status(500).send({
                    message: err.message
                });
            });
        });
    }
    async createGroup(req, res) {
        Direction.findOne({
            where: {
                name: req.body.directionName
            }
        }).then(direction => {
            Group.create({
                name: req.body.groupName,
                directionId: direction.id
            }).then(() => {
                res.status(201).send({
                    message: "Группа была успешно создана"
                });
            })
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
}

module.exports = new UniversityController();