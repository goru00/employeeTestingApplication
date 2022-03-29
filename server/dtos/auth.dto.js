class AuthDto {
    username;
    name;
    email;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.username = model.username;
        this.name = model.name;
        this.isActivated = model.isActivated;
    }
}

module.exports = AuthDto;