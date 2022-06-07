const GroupDto = require('../../dtos/university.dtos/group.dto');
const db = require('../../models');
const Group = db.group;
const Op = db.Sequelize.Op;

class GroupService {
    async createGroup(props) {
        const { id, directionId } = props;
        const group = await Group.create({
            id: id,
            directionId: directionId
        });
        const groupDto = new GroupDto(group);
        return {
            ...groupDto
        }
    }

    async getGroups() {
        const groups = await Group.findAll();
        let groupsDto = [];
        for (let index = 0; index < groups.length; index++) {
            groupsDto.push(new GroupDto(groups[index]));
        }
        return {
            groups: groupsDto
        }
    }

    async getGroupsOfTheDirection(params) {
        const { directionId } = params;
        const groups = await Group.findAll({
            where: {
                directionId: directionId
            }
        });
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