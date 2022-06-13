const GroupService = require('../../services/university.services/group.service');

class GroupController {
    async createGroup(req, res, next) {
        try {
            const groupData = await GroupService.createGroup({...req.body, ...req.params});
            return res.status(201).json({
                message: "Группа была успешно создана",
                ...groupData
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    } 

    async getGroupsOfTheDirection(req, res, next) {
        try {
            const groups = await GroupService.getGroupsOfTheDirection({...req.params});
            return res.status(200).json(groups);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getGroupsOfTheDiscipline(req, res, next) {
        try {
            const groups = await GroupService.getGroupsOfTheDiscipline(req.params.id);
            return res.status(200).json(groups);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getGroups(req, res, next) {
        try {
            const groups = await GroupService.getGroups();
            return res.status(200).json(groups);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = new GroupController();