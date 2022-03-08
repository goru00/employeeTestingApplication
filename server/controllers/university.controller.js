const db = require('../models');
const Cathedra = db.cathedra;
const Direction = db.direction;
const Discipline = db.discipline;
const Student = db.student;
const Teacher = db.teacher;
const User = db.user;
const Group = db.group;
const Op = db.Sequelize.Op;

class UniversityController
{
    async getStudents(req, res) {
        Student.findAll().then(students => {
            if (!students) {
                res.status(200).send({
                    message: "По Вашему запросу не было найдено ни одного студента"
                });
            }
            res.status(200).send(students);
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async createStudent(req, res) {
        User.findOne({
            where: {
                name: req.body.name
            }
        }).then(user => {
            Student.create({
                userId: user.username,
                tabNum: req.body.tabNum
            }).then(student => {
                Group.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.groupsName
                        }
                    }
                }).then(async groups => {
                    await groups.forEach(group => {
                        group.setStudents(student);
                    })
                    res.status(201).send({
                        message: "Студент был успешно создан"
                    });
                });
            })
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async createTeacher(req, res) {
        User.findOne({
            where: {
                name: req.body.name
            }
        }).then(user => {
            Teacher.create({
                userId: user.username,
                tabNum: req.body.tabNum,
                position: req.body.position,
                academic: req.body.academic
            }).then(teacher => {
                Cathedra.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.cathedrasName
                        }
                    }
                }).then(async cathedras => {
                    await cathedras.forEach(cathedra => {
                        cathedra.setTeachers(teacher);
                    });
                    res.status(201).send({
                        message: "Преподаватель был успешно создан"
                    });
                });
            });  
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
            name: req.body.cathedraName
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
                    message: "Направление было успешно создано"
                });
            }).catch(err => {
                return res.status(500).send({
                    message: err.message
                });
            });
        });
    }
    async getGroups(req, res) {
        Group.findAll().then(groups => {
            if (!groups) {
                res.status(200).send({
                    message: "По Вашему запросу не было найдено ни одной учебной группы"
                });
            }
            res.status(200).send(groups);
        }).catch(err => {
            return res.status(500).send({
                message: err.message
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
    async getDisciplines(req, res, next) {
        Discipline.findAll().then(disciplines => {
            if (!disciplines) {
                res.status(200).send({
                    message: "Дисциплин по Вашему запросу не было найдено"
                });
            }
            res.status(200).send(disciplines);
        })
    }
    async createDiscipline(req, res, next) {
        Discipline.create({
            name: req.body.disciplineName
        }).then(discipline => {
            Direction.findOne({
                where: {
                    name: req.body.directionName
                }
            }).then(direction => {
                discipline.setDirections(direction).then(() => {
                    res.status(201).send({
                        message: "Дисциплина была успешно создана"
                    });
                });
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
}

module.exports = new UniversityController();