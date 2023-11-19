const {
    Event,
    Department,
    Subdepartment,
    Direction,
    Subdirection,
} = require("../db/models");
const { Op } = require('sequelize');
const ApiError = require("../error/ApiError");

class EventController {
    async getAll(req, res) {
        const events = await Event.findAll({
            include: [
                { model: Subdepartment },
                { model: Subdirection },
                { model: Department },
                { model: Direction },
            ],
        });

        return res.json(events);
    }

    async getOne(req, res) {
        const { id } = req.params;

        const event = await Event.findOne({
            where: { id: id },
            include: [{ model: Department }, { model: Direction }],
        });

        if (event === null) {
            return ApiError.notFound("Event doesn't exist");
        }

        return res.json(event);
    }

    async create(req, res) {
        const { name } = req.body;
        const { subdepartment_id } = req.body;
        const { department_id } = req.body;
        const { organizers_id } = req.body;
        const { planned_result } = req.body;
        const { invitees_id } = req.body;
        const { completion_status } = req.body;
        const { note } = req.body;

        const event = await Event.create({
            name,
            subdepartment_id,
            department_id,
            organizers_id,
            planned_result,
            invitees_id,
            completion_status,
            note,
        });

        return res.json(event);
    }
}

module.exports = new EventController();
