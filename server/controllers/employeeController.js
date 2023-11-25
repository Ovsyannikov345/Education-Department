const { Employee } = require("../db/models");

class EmployeeController {
    async getAll(req, res) {
        const employees = await Employee.findAll();

        return res.json(employees);
    }

    async create(req, res) {
        const employee = {
            ...req.body,
        };

        const result = await Employee.create(employee);

        return res.json(result.dataValues);
    }

    async delete(req, res) {
        const { id } = req.params;

        await Employee.destroy({ where: { id: id } });

        return res.json();
    }
}

module.exports = new EmployeeController();
