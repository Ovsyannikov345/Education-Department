const { Student } = require("../db/models");

class StudentController {
    async getAll(req, res) {
        try {
            const students = await Student.findAll();

            return res.json(students);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async create(req, res) {
        const student = {
            ...req.body,
        };

        try {
            const result = await Student.create(student);

            return res.status(201).json(result);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.sendStatus(400);
        }

        if ((await Student.findOne({ where: { id: id } })) == null) {
            return res.sendStatus(404);
        }

        try {
            await Student.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = new StudentController();
