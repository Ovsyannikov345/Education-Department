const { Subdirection } = require("../db/models");

class SubdirectionController {
    async getAll(req, res) {
        try {
            const subdirections = await Subdirection.findAll();

            return res.json(subdirections);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки мероприятий" });
        }
    }
}

module.exports = new SubdirectionController();
