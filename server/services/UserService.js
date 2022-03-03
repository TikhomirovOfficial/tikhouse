const {User, Code} = require("../models")
const uuid = require('uuid-js')
const SMSservice = require('./SMSservice')
const tokenService = require('./TokenService')
const userDto = require('../dtos/UserDto')

class UserService {
    async registration(user) {
        const userCandidate = await User.findOne({ where: {phone: user.phone} });
        if (userCandidate) {
            throw new Error(`пользователь с таким номером телефона уже существует!`)
        }
        const uuid4 = uuid.create().toString();
        const userCreated = await User.create({
            uuid: uuid4,
            fullname: user.full_name,
            phone: user.phone,
            password: user.password,
            avatar: user.avatar ? user.avatar : "sas"
        });

        const userData = new userDto(userCreated)
        await SMSservice.sendActivationCode(userData)

        const tokens = tokenService.generateTokens(userData)
        await tokenService.saveToken(userData.id, tokens.refreshToken)
        return {
            ...userData,
            tokens
        }

    };
    async activate(phone, code) {
        const user = await User.findOne({where: {phone: phone}})
        if (!user) {
            throw new Error("Пользователя с таким номером не сущесвует.")
        }
        const codeCandidate = await Code.findOne({where: {user_id: user.id}})

        if (codeCandidate && code === codeCandidate.code) {
            console.log("yes")
            user.isActive = true
            codeCandidate.destroy()
            return user.save()
        }
        throw new Error("Неккоректный код!")
    }
}

module.exports = new UserService()