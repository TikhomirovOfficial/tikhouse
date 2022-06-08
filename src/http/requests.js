import {Axios} from "./axios";
import Cookies from 'nookies'

const defualtInstance = Axios

const errorChecker = res => {
    //console.log(res);
    const error = res?.data?.error
    if(error) {
        throw new Error(error)
    }
}

const request = async (methodReq, path, data, options = {}) => {
    const method = methodReq.toLowerCase()
    const reqInstance = options.instance || defualtInstance

    if(options.sendingToken) {
        const cookies = Cookies.get(options.context)
        data.refreshToken = cookies.refreshToken
    }

    const res = await reqInstance[method](path, data)
    errorChecker(res)
    return res
} 

export default class Api {
    static async registration(data) {
        return await request('POST', '/register', data)
    }
    static async login(data) {
        return await request('POST', '/login', data)
    }
    static async activateUser(phone, code) {
        return await request('POST', '/user/activate', {phone, code})
    }
    static async refreshToken(ctx) {
        return await request('POST', '/refresh', {}, {
            sendingToken: true,
            context: ctx
        })
    }
    static async getRooms(ctx) {
        return await request('GET', '/rooms', null, {
            context: ctx
        })
    }
    static async getRoom(room_id, ctx) {
        return await request('GET', `/rooms/${room_id}`, null, {
            context: ctx
        })
    }

    static async getUser(instance) {
        return await request('GET', '/me', null, {
            instance: instance
        })
    }
}