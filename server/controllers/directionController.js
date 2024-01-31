const { Direction, Subdirection } = require("../db/models");

class DirectionController {
    async getAll(req, res) {
        try {
            const directions = await Direction.findAll({
                include: { model: Subdirection },
            });

            return res.json(directions);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки направлений" });
        }
    }
}

module.exports = new DirectionController();
