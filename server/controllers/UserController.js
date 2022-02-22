class UserController {
    async registration (req, res, next) {
        try {
            
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