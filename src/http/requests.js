import {Axios} from "./axios";


const errorChecker = res => {
    const error = res.data.error
    if(error) {
        throw new Error(error)
    }
}

const request = async (path, data) => {
    const res = await Axios.post(path, data)
    errorChecker(res)
    return res.data
} 

export default class Api {
   static async registration(data) {
      return await request('/register', data)
   }
   
   static async activateUser(phone, code) {
      return await request('/user/activate', {phone, code})
   }

   static async getUser(ctx) {
        //get user
   }
}