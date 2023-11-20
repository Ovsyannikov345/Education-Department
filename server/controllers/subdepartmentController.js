const { Subdepartment } = require("../db/models");

class SubdepartmentController {
    async getAll(req, res) {
        const subdepartments = await Subdepartment.findAll();

        return res.json(subdepartments);
    }
}

module.exports = new SubdepartmentController();