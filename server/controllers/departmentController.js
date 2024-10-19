const { Department, Subdepartment } = require("../db/models");

class DepartmentController {
    async getAll(req, res) {
        try {
            const departments = await Department.findAll({
                include: { model: Subdepartment },
                order: [["id", "ASC"]],
            });

            return res.json(departments);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загузки подразделений" });
        }
    }
}

module.exports = new DepartmentController();
