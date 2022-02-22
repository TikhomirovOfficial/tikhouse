const User = require("../models/user")
const uuid = require('uuid-js')

class UserService {
    async registration(user) {
        const userCandidate = await User.findOne({ where: {phone: user.phone} });
        if (userCandidate) {
            throw new Error(`пользователь с таким номером телефона уже существует!`)
        }
        const uuid4 = uuid.create().toString();
        const userCreated = await User.create({
            uuid: uuid4,
            login: user.login,
            fullname: user.fullname,
            isActive: false

        });

    };
}

module.exports = new UserService()