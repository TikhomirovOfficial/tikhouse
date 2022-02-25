const {User} = require("../models")
const uuid = require('uuid-js')
const smsService = require('./SMSservice')
const tokenService = require('./TokenService')
const generateCode = require('../utils/GenerateCode')
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
            avatar: user.avatar ? user.avatar : "sas"
        });

        await smsService.sendActivationCode(user.phone, generateCode)
        const userData = new userDto(userCreated)

        const tokens = tokenService.generateTokens(userData)
        await tokenService.saveToken(userData.id, tokens.refreshToken)
        return {
            ...userData,
            tokens
        }

    };
}

module.exports = new UserService()