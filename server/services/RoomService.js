const {Room} = require('../models')
const ApiError = require("../exceptions/ApiError");

class RoomService {
    async all() { 
        return await Room.findAll()
    }
    async create(data) {
        if(!data.title) {
            throw ApiError.BadRequest("Не указано название комнаты")
        }
        return await Room.create({
            title: data.title
        })
    }
    async getRoom(params) {
        if(isNaN(Number(params.id))) {
            throw ApiError.BadRequest("Некорректный номер комнаты")
        }
        const room = await Room.findOne({where: {id:params.id}})
        if(!room) {
            throw ApiError.BadRequest("Комнаты с таким номером не существует")
        }
        return room
    }
    async deleteRoom(params) {
        if(!params.id) {
            throw ApiError.BadRequest("Комната не найдена!")
        }
        return await Room.destroy({where: {id: params.id}})

    }
}

module.exports = new RoomService()