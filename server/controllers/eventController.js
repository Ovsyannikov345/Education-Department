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
        try {
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
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.sendStatus(400);
        }

        try {
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

            if (event == null) {
                return res.sendStatus(404);
            }

            return res.json(event);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async create(req, res) {
        const event = { ...req.body };

        try {
            const createdEvent = await Event.create(event);

            createdEvent.addEmployees(event.employees.map((emp) => emp.id));
            createdEvent.addStudents(event.students.map((std) => std.id));
            createdEvent.addParticipants(event.participants.map((prt) => prt.id));

            return res.status(201).json();
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async update(req, res) {
        const { id } = req.params;

        const event = { ...req.body };

        if (isNaN(id) || parseInt(id) !== event.id) {
            return res.sendStatus(400);
        }

        if (Event.findOne({ where: { id: id } }) == null) {
            return res.sendStatus(404);
        }

        try {
            const a = await Event.update(event, { where: { id: id } });

            const eventRecord = await Event.findOne({ where: { id: id } });

            const employees = await eventRecord.getEmployees();
            const students = await eventRecord.getStudents();
            const participants = await eventRecord.getParticipants();

            eventRecord.removeEmployees(employees);
            eventRecord.removeStudents(students);
            eventRecord.removeParticipants(participants);

            eventRecord.addEmployees(event.employees.map((emp) => emp.id));
            eventRecord.addStudents(event.students.map((std) => std.id));
            eventRecord.addParticipants(event.participants.map((prt) => prt.id));

            return res.sendStatus(204);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.sendStatus(400);
        }

        if ((await Event.findOne({ where: { id: id } })) == null) {
            return res.sendStatus(404);
        }

        try {
            await Event.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = new EventController();
