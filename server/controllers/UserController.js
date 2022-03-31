const UserService = require("../services/UserService")

class UserController {
    async registration (req, res, next) {
        try {
            const user = req.body
            const userData = await UserService.registration(user)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 1000*60*60*24*30, httpOnly:true})
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }
    async activate (req, res, next) {
        try {
            const {phone, code} = req.body
            const userActivated = await UserService.activate(phone, code)
            return res.json(userActivated)

        } catch (e) {
            next(e)
        }
    }
    async login (req, res, next) {
        try {
            const {phone, password} = req.body
            const userData = await UserService.login(phone, password)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 1000*60*60*24*30, httpOnly:true})
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }
    async logout (req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }
    async uploadAvatar (req, res, next) {
        try {
            const file = req.file
            res.json(file.path.replace('..\\public\\', ''))
        } catch (e) {
           return next(e)
        }
    }
}

module.exports = new UserController()