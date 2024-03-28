const { Group } = require("../db/models");

class GroupController {
    async getAll(req, res) {
        try {
            const groups = await Group.findAll();

            return res.json(groups);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки групп" });
        }
    }
}

module.exports = new GroupController();
