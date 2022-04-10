const ApiError = require("../exceptions/ApiError");
const tokenService = require("../services/TokenService")
module.exports = (req, res, next) => {
    try {
        const headerAuth = req.headers.authorization
        if (!headerAuth) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = headerAuth.split(' ')[1]
        if(!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.verifyAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }

}