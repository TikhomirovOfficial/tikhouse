const generateCode = require('../utils/GenerateCode')
const {Code} = require("../models");
const axios = require('axios')

class SMSservice {
    async sendActivationCode (user) {
        this.userCodeCheck(user)
            .then(({code}) => {
                axios.get(`https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=${user.phone}&msg=${code}&json=1`)
            })
    }
    async userCodeCheck(user) {
        const candidate = await Code.findOne({where:{user_id: user.id}})
        if (candidate) {
            candidate.code = generateCode()
            return candidate.save()
        }
        return await Code.create({
            user_id: user.id,
            code: generateCode()
        })
    }
}

module.exports = new SMSservice()