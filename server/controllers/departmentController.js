const { Department, Subdepartment } = require("../db/models");

class DepartmentController {
    async getAll(req, res) {
        try {
            const departments = await Department.findAll({
                include: { model: Subdepartment },
            });

            return res.json(departments);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = new DepartmentController();
