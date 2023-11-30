const {
    Event,
    Department,
    Subdepartment,
    Direction,
    Subdirection,
    Employee,
    Student,
    Participant,
} = require("../db/models");

class EventController {
    async getAll(req, res) {
        const events = await Event.findAll({
            include: [
                { model: Subdepartment },
                { model: Subdirection },
                { model: Department },
                { model: Direction },
                { model: Employee },
                { model: Student },
                { model: Participant },
            ],
        });

        return res.json(events);
    }

    async getOne(req, res) {
        const { id } = req.params;

        const event = await Event.findOne({
            where: { id: id },
            include: [
                { model: Subdepartment },
                { model: Subdirection },
                { model: Department },
                { model: Direction },
                { model: Employee },
                { model: Student },
                { model: Participant },
            ],
        });

        return res.json(event);
    }

    async create(req, res) {
        const event = {
            name: req.body.name,
            description: req.body.description,
            plannedResult: req.body.plannedResult,
            date: `${req.body.date}T${req.body.time}:00.000Z`,
            departmentId: req.body.departmentId,
            subdepartmentId: req.body.subdepartmentId,
            directionId: req.body.directionId,
            subdirectionId: req.body.subdirectionId,
            employees: req.body.employees,
            students: req.body.students,
            participants: req.body.participants,
        };

        const createdEvent = await Event.create(event);

        try {
            createdEvent.addEmployees(event.employees.map((emp) => emp.id));
            createdEvent.addStudents(event.students.map((std) => std.id));
            createdEvent.addParticipants(event.participants.map((prt) => prt.id));
        } catch (e) {
            console.log(e);
        }

        return res.json();
    }

    async update(req, res) {
        const { id } = req.params;
        // TODO Make client do that.
        const event = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            plannedResult: req.body.plannedResult,
            date: `${req.body.date}T${req.body.time}:00.000Z`,
            departmentId: req.body.departmentId,
            subdepartmentId: req.body.subdepartmentId,
            directionId: req.body.directionId,
            subdirectionId: req.body.subdirectionId,
            employees: req.body.Employees,
            students: req.body.Students,
            participants: req.body.Participants,
        };
        if (parseInt(id) !== event.id) {
            return res.status(400).send();
        }

        try {
            await Event.update(event, { where: { id: id } });
            return res.status(200).send();
        } catch (err) {
            console.log(err);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        await Event.destroy({ where: { id: id } });

        return res.json();
    }
}

module.exports = new EventController();
