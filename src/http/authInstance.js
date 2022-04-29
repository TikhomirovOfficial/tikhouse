import Cookies, {parseCookies} from 'nookies'
import { Axios } from './axios'
import axios from 'axios';
import {cookieNext} from '../utils/cookieNext'

const API_URL = "http://localhost:3001/api"

export const AuthInstance = (ctx = null) => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies()
    const token = cookies.token
    //console.log(token);
    
    const instance =  Axios.create({
        baseURL: API_URL,
        withCredentials: true,
        crossDomain: true,
        headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Credentials': true
        }
    });
    let _isRetry = false  
    instance.interceptors.response.use(async (config) => {
        const originalReq = config
        
        //ДЕЛАТЬ ЗАПРОС ЗАНОВО, ЕСЛИ ОШИБКА
        if(originalReq.data.code == 401 && !_isRetry){
            //console.log(_isRetry);
            _isRetry = true 
            //console.log("work");
            const res = await Axios.post(`/refresh`, {refreshToken: cookies.refreshToken})
                .then(async ({data}) => {
                    ctx ? cookieNext(ctx, data) : null
                    return data
                })
                .then(async (data) => {
                    originalReq.config.headers.Authorization = `Bearer ${data.accessToken}`
                    return await axios.request(originalReq.config);
                    
                })
                .catch((e) => {
                    console.log(e);
                }) 
            //console.log(res.data);
            return res
        }
        return config
        
       
    })
    return instance
    
}