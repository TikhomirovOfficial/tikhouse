const UserService = require("../services/UserService")

class UserController {
    async registration (req, res, next) {
        try {
            const user = req.body
            const userData = await UserService.registration(user)
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
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 1000*60*60*24*30})
            res.cookie("token", userData.accessToken, {maxAge: 1000*60*60*24*30})
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)

        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.body
            console.log(req.body);
            const userData = await UserService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 1000*60*60*24*30})
            res.cookie("token", userData.accessToken, {maxAge: 1000*60*60*24*30})
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        const users = await UserService.getAllUsers()
        res.json(users)
    }

    async uploadAvatar (req, res, next) {
        try {
            const file = req.file
            res.json(file.path.replace('..\\public\\', ''))
        } catch (e) {
           return next(e)
        }
    }

    async getMe(req, res, next) {
        console.log("sas");
        return res.json({sas: 30})
    }
}

module.exports = new UserController()