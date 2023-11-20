const { Department, Subdepartment } = require("../db/models");

class DepartmentController {
    async getAll(req, res) {
        const departments = await Department.findAll({
            include: { model: Subdepartment },
        });

        return res.json(departments);
    }
}

module.exports = new DepartmentController();
