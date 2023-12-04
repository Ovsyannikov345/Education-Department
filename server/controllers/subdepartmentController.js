const { Subdepartment } = require("../db/models");

class SubdepartmentController {
    async getAll(req, res) {
        try {
            const subdepartments = await Subdepartment.findAll();

            return res.json(subdepartments);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = new SubdepartmentController();
