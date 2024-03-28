const { sequelize } = require("../db/index");
const { Student, Group } = require("../db/models");

class StudentController {
    async getAll(req, res) {
        try {
            const students = await Student.findAll({
                include: [{ model: Group }],
            });

            return res.json(students);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки студентов" });
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
            return res.status(500).json({ error: "Неизвестная ошибка во время создания студента" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id студента" });
        }

        if ((await Student.findOne({ where: { id: id } })) == null) {
            return res.status(404).json({ error: "Студента не существует" });
        }

        try {
            await Student.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время удаления студента" });
        }
    }
}

module.exports = new StudentController();
