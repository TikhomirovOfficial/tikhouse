import Cookies from 'nookies'

export const cookieNext = (ctx, data) => {

    Cookies.set(ctx, 'refreshToken', data.refreshToken, {
        maxAge: 1000*60*60*24*30
    })
    Cookies.set(ctx, 'token', data.accessToken, {
        maxAge: 1000*60*60*24*30
    })
}