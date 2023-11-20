const {
    Event,
    Department,
    Subdepartment,
    Direction,
    Subdirection,
} = require("../db/models");

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

        return res.json(event);
    }

    async create(req, res) {
        // const { name } = req.body;
        // const { subdepartment_id } = req.body;
        // const { department_id } = req.body;
        // const { organizers_id } = req.body;
        // const { planned_result } = req.body;
        // const { invitees_id } = req.body;
        // const { completion_status } = req.body;
        // const { note } = req.body;

        // const event = await Event.create({
        //     name,
        //     subdepartment_id,
        //     department_id,
        //     organizers_id,
        //     planned_result,
        //     invitees_id,
        //     completion_status,
        //     note,
        // });

        const event = {
            name: req.body.name,
            description: req.body.description,
            plannedResult: req.body.plannedResult,
            date: `${req.body.date}T${req.body.time}:00.000Z`,
            departmentId: req.body.departmentId,
            subdepartmentId: req.body.subdepartmentId,
            directionId: req.body.directionId,
            subdirectionId: req.body.subdirectionId,
        };

        console.log(event);

        const a = await Event.create(event);
        
        console.log(a);
        return res.json();
    }
}

module.exports = new EventController();
