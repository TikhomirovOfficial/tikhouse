module.exports = class UserDto {
    id;
    phone;
    uuid;
    fullname;
    isActivated;

    constructor(model) {
        this.id = model.id;
        this.uuid = model.uuid;
        this.phone = model.phone;
        this.fullname = model.fullname;
        this.isActivated = model.isActive;
    }
}