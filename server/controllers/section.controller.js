const db = require('../models');

const Section = db.section;

class SectionController {
    async create(req, res) {
        Section.create({
            name: req.body.name,
            description: req.body.description
        }).then(() => {
            res.status(201).send({
                message: "Раздел успешно добавлен"
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }
    async get(req, res) {
        const { id } = req.query;
        if (!id) {
            Section.findAll().then(sections => {
                res.send(sections);
            }).catch(err => {
                return res.status(500).send({
                    message: err.message
                });
            });
        } 
    }
}

module.exports = new SectionController();