const GroupService = require('../../services/university.services/group.service');

class GroupController {
    async createGroup(req, res, next) {
        try {
            const groupData = await GroupService.createGroup({...req.body});
            return res.status(201).json({
                message: "Группа была успешно создана",
                ...groupData
            });
        } catch (err) {
            next(err);
        }
    } 
    async getGroups(req, res, next) {
        try {
            const groups = await GroupService.getGroups({...req.params});
            return res.status(200).json(groups);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new GroupController();