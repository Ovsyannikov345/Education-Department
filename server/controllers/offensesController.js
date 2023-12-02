const { Offense, Student } = require("../db/models");

class OffensesController {
    async getAll(req, res) {
        try {
            const offenses = await Offense.findAll({
                include: [{ model: Student }],
            });

            return res.json(offenses);
        } catch (e) {
            return res.sendStatus(500);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await Offense.destroy({ where: { id: id } });
            res.sendStatus(204);
        } catch (error) {
            return res.sendStatus(404);
        }
    }
}

module.exports = new OffensesController();