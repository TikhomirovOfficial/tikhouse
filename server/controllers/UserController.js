const UserService = require("../services/UserService")

class UserController {
    async registration (req, res) {
        try {
            const user = req.body
            const userData = await UserService.registration(user)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 1000*60*60*24*30, httpOnly:true})
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }
    async activate (req, res) {
        try {
            const {phone, code} = req.body
            const userActivated = await UserService.activate(phone, code)
            return res.json(userActivated)

        } catch (e) {

        }
    }
    async login (req, res, next) {
        try {

        } catch (e) {

        }
    }
    async logout (req, res, next) {
        try {

        } catch (e) {

        }
    }
    async uploadAvatar (req, res, next) {
        try {
            const file = req.file
            res.json(file.path.replace('..\\public\\', ''))
        } catch (e) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
    }
}

module.exports = new UserController()