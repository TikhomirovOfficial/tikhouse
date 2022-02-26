const generateCode = require('../utils/GenerateCode')
const {Code} = require("../models");
const axios = require('axios')

class SMSservice {
    async sendActivationCode (user) {
        console.log(this.userCodeCheck(user))
    }
    async userCodeCheck(user) {
        const candidate = await Code.findOne({where:{user_id: user.id}})
        if (candidate) {
            candidate.code = generateCode()
            return candidate.save()
        }
        const codeCreated = await Code.create({
            user_id: user.id,
            code: generateCode()
        })
        return codeCreated
    }
}

module.exports = new SMSservice()