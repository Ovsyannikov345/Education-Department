const { Direction, Subdirection } = require("../db/models");

class DirectionController {
    async getAll(req, res) {
        try {
            const directions = await Direction.findAll({
                include: { model: Subdirection },
            });

            return res.json(directions);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = new DirectionController();
