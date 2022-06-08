const RoomService = require("../services/RoomService")

class RoomController {
    async index (req, res, next) {
        try {
            const rooms = await RoomService.all()
            return res.json(rooms)
        } catch (e) {
            next(e)
        }
    }
    async store (req, res, next) {
        try {
            const created = await RoomService.create(req.body)
            return res.json(created)
        } catch (e) {
            next(e)
        }
    }
    async show(req, res, next) {
        try {
            const room = await RoomService.getRoom(req.params)
            return res.json(room)
        } catch (e) {
            next(e)
        }
    }
    async destroy(req, res, next) {
        try {
            const room = await RoomService.deleteRoom(req.params)
            return res.json(room)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RoomController()