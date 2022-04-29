import Api from "../http/requests"
import {AuthInstance} from '../http/authInstance'
import {cookieNext} from './cookieNext'

export const CheckAuth = async (ctx) => {
    try {
        const response = await Api.refreshToken(ctx)
        //console.log(response);
        if(response.data) {
            cookieNext(ctx, response.data)
        }
        return response    
    } catch (error) {
        console.log(error.message);
        return null
    }
}
