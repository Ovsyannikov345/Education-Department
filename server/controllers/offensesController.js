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

    async getOne(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.sendStatus(400);
        }

        try {
            const offense = await Offense.findOne({ where: { id: id }, include: [{ model: Student }] });

            if (offense == null) {
                return res.sendStatus(404);
            }

            return res.json(offense);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async post(req, res) {
        const offense = { ...req.body };

        try {
            const createdOffense = await Offense.create(offense);

            return res.status(201).json(createdOffense);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async put(req, res) {
        const { id } = req.params;

        const offense = { ...req.body };

        if (isNaN(id) || parseInt(id) !== offense.id) {
            return res.sendStatus(400);
        }

        if (Offense.findOne({ where: { id: id } }) == null) {
            return res.sendStatus(404);
        }

        try {
            await Offense.update(offense, { where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async delete(req, res) {
        // TODO validate id.
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
