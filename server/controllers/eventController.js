const { Event, Department, Subdepartment, Direction, Subdirection, Employee, Student, Participant, Group } = require("../db/models");

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
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки мероприятий" });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id мероприятия" });
        }

        try {
            const event = await Event.findOne({
                where: { id: id },
                include: [
                    { model: Subdepartment },
                    { model: Subdirection },
                    { model: Department, include: [{ model: Subdepartment }] },
                    { model: Direction, include: [{ model: Subdirection }] },
                    { model: Employee },
                    { model: Student },
                    { model: Group },
                    { model: Participant },
                ],
            });

            if (event == null) {
                return res.status(404).json({ error: "Мероприятия не существует" });
            }

            return res.json(event);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки мероприятия" });
        }
    }

    async create(req, res) {
        const event = { ...req.body };

        try {
            const createdEvent = await Event.create(event);

            createdEvent.addEmployees(event.employees.map((emp) => emp.id));
            createdEvent.addStudents(event.students.map((std) => std.id));
            createdEvent.addParticipants(event.participants.map((prt) => prt.id));
            createdEvent.addGroups(event.groups.map((group) => group.id));

            return res.status(201).json();
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время создания мероприятия" });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        const event = { ...req.body };

        if (isNaN(id) || parseInt(id) !== event.id) {
            return res.sendStatus(400);
        }

        if (Event.findOne({ where: { id: id } }) == null) {
            return res.status(404).json({ error: "Мероприятия не существует" });
        }

        try {
            await Event.update(event, { where: { id: id } });

            const eventRecord = await Event.findOne({ where: { id: id } });

            const employees = await eventRecord.getEmployees();
            const students = await eventRecord.getStudents();
            const participants = await eventRecord.getParticipants();
            const groups = await eventRecord.getGroups();

            eventRecord.removeEmployees(employees);
            eventRecord.removeStudents(students);
            eventRecord.removeParticipants(participants);
            eventRecord.removeGroups(groups);

            eventRecord.addEmployees(event.employees.map((emp) => emp.id));
            eventRecord.addStudents(event.students.map((std) => std.id));
            eventRecord.addParticipants(event.participants.map((prt) => prt.id));
            eventRecord.addGroups(event.groups);

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время изменения мероприятия" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id мероприятия" });
        }

        if ((await Event.findOne({ where: { id: id } })) == null) {
            return res.status(404).json({ error: "Мероприятия не существует" });
        }

        try {
            await Event.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время удаления мероприятия" });
        }
    }
}

module.exports = new EventController();
