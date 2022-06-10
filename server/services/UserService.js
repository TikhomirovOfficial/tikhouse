const {User, Code} = require("../models")
const uuid = require('uuid-js')
const SMSservice = require('./SMSservice')
const tokenService = require('./TokenService')
const userDto = require('../dtos/UserDto')
const ApiError = require("../exceptions/ApiError");
const bcrypt = require('bcrypt')


class UserService {
    async registration(user) {
        const userCandidate = await User.findOne({ where: {phone: user.phone} });
        if (userCandidate) {
            throw ApiError.BadRequest(`Пользователь с номером ${user.phone} существует.`)
        }
        const uuid4 = uuid.create().toString();
        if(user.phone && user.full_name && user.password) {
            const hashPassword = await bcrypt.hash(String(user.password), 3)
            const userCreated = await User.create({
                uuid: uuid4,
                fullname: user.full_name,
                phone: user.phone,
                password: hashPassword,
                avatar: user.avatar ? user.avatar : "sas"
            });
            const userData = new userDto(userCreated)
            await SMSservice.sendActivationCode(userData)

            const tokens = tokenService.generateTokens(userData)
            await tokenService.saveToken(userData.id, tokens.refreshToken)
            return {
                ...userData,
                ...tokens
            }
        }
        throw ApiError.BadRequest("Отсутсвуют необходимые поля!")
    };

    async login(phone, password) {
        const user = await User.findOne({where: {phone: phone}})
        if (!user) {
            throw ApiError.BadRequest("Пользователя с таким номером не существует")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль")
        }
        const userData = new userDto(user)
        const tokens = tokenService.generateTokens(userData)
        await tokenService.saveToken(userData.id, tokens.refreshToken)

        return {
            ...userData,
            ...tokens
        }
    }

    async getAllUsers() {
        return await User.findAll()
    }

    async refresh(token) {
        if (!token) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.verifyRefreshToken(token)
        const tokenExists = tokenService.tokenIsExists(token)

        if(!userData || !tokenExists) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findOne({where: {id: userData.id}})
        if (user) {
            const userDTO = new userDto(user)
            const tokens = tokenService.generateTokens(userDTO)
            await tokenService.saveToken(userData.id, tokens.refreshToken)

            return {
                ...userDTO,
                ...tokens
            }
        }
        throw ApiError.BadRequest("Пользователь не найден")
    }

    async logout (token) {
        if (!token) {
            throw ApiError.UnauthorizedError()
        }
        return tokenService.deleteToken(token)
    }

    async activate(phone, code) {
        const user = await User.findOne({where: {phone: phone}})
        if (!user) {
            throw ApiError.BadRequest("Пользователя с таким номером не сущесвует.")
        }
        const codeCandidate = await Code.findOne({where: {user_id: user.id}})

        if (codeCandidate && code === codeCandidate.code) {
            user.isActive = true
            await codeCandidate.destroy()
            user.save()
            const savedDTO = new userDto(user)
            return {...savedDTO}
        }
        throw ApiError.BadRequest("Неверный код подтверждения!")
    }
}

module.exports = new UserService()
