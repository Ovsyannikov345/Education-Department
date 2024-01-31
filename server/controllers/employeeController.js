const { Employee } = require("../db/models");

class EmployeeController {
    async getAll(req, res) {
        try {
            const employees = await Employee.findAll();

            return res.json(employees);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки сотрудников" });
        }
    }

    async create(req, res) {
        const employee = { ...req.body };

        try {
            const result = await Employee.create(employee);

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время создания сотрудника" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id сотрудника" });
        }

        if ((await Employee.findOne({ where: { id: id } })) == null) {
            return res.status(404).json({ error: "Сотрудника не существует" });
        }

        try {
            await Employee.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время удаления сотрудника" });
        }
    }
}

module.exports = new EmployeeController();
