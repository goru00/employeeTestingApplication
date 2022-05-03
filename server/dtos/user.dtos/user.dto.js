class UserDto {
    userId;
    name;
    email;
    roles;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.userId = model.userId;
        this.name = model.name;
        this.roles = model.roles;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;