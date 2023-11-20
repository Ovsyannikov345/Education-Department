const { Direction, Subdirection } = require("../db/models");

class DirectionController {
    async getAll(req, res) {
        const directions = await Direction.findAll({
            include: { model: Subdirection },
        });

        return res.json(directions);
    }
}

module.exports = new DirectionController();
