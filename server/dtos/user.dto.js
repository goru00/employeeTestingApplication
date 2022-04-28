class UserDto {
    username;
    name;
    email;
    roles;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.username = model.username;
        this.name = model.name;
        this.roles = model.roles;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;