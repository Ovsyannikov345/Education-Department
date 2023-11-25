const {
    Event,
    Department,
    Subdepartment,
    Direction,
    Subdirection,
    Employee,
    Student,
    EventParticipants,
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
        };

        const createdEvent = await Event.create(event);

        try {
            createdEvent.addEmployees(event.employees.map(emp => emp.id));
            createdEvent.addStudents(event.students.map(std => std.id));
        } catch (e) {
            console.log(e);
        }
        
        return res.json();
    }
}

module.exports = new EventController();
