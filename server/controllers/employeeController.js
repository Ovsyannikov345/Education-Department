const { Employee } = require("../db/models");

class EmployeeController {
    async getAll(req, res) {
        try {
            const employees = await Employee.findAll();

            return res.json(employees);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async create(req, res) {
        const employee = {
            ...req.body,
        };

        try {
            const result = await Employee.create(employee);

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

        if (Employee.findOne({ where: { id: id } }) == null) {
            return res.sendStatus(404);
        }

        try {
            await Employee.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = new EmployeeController();
