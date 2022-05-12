class UserDto {
    userId;
    name;
    email;
    isActivated;
    roles = null;

    constructor(model) {
        this.email = model.email;
        this.userId = model.userId;
        this.name = model.name;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;