const db = require('../models');

const Position = db.position;

class PositionController {
    async get(req, res) {
        const { id } = req.query;
        if (!id) {
            Position.findAll().then(positions => {
                res.status(201).send(positions);
            }).catch(err => {
                return res.status(500).send({
                    message: err.message
                });
            });
        } 
    }
    async create(req, res) {
        Position.create({
            name: req.body.name
        }).then(() => {
            res.status(201).send({
                message: "Должность успешно добавлена"
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
}

module.exports = new PositionController();