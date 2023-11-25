const { Student } = require("../db/models");

class StudentController {
    async getAll(req, res) {
        const students = await Student.findAll();

        return res.json(students);
    }

    async create(req, res) {
        const student = {
            ...req.body,
        };

        const result = await Student.create(student);

        return res.json(result.dataValues);
    }

    async delete(req, res) {
        const { id } = req.params;

        await Student.destroy({ where: { id: id } });

        return res.json();
    }
}

module.exports = new StudentController();
