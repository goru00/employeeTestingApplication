const GroupDto = require('../../dtos/university.dtos/group.dto');
const db = require('../../models');
const Group = db.group;
const Op = db.Sequelize.Op;

class GroupService {
    async createGroup(props) {
        const { groupName, directionId } = props;
        const group = await Group.create({
            name: groupName,
            directionId: directionId
        });
        const groupDto = new GroupDto(group);
        return {
            group: groupDto
        }
    }
    async getGroups(params) {
        const { groupName, directionId } = params;
        if (groupName || directionId) {
            const group = Group.findOne({
                where: {
                    [Op.or]: [
                        groupName,
                        directionId
                    ]
                }
            });
            const groupDto = new GroupDto(group);
            return {
                group: groupDto
            }
        }
        const groups = await Group.findAll();
        let groupsDto = [];
        for (let index = 0; index < groups.length; index++) {
            groupsDto.push(new GroupDto(groups[index]));
        }
        return {
            groups: groupsDto
        }
    }
}

module.exports = new GroupService();