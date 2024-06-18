const { Offense, Student, Group } = require("../db/models");

class OffensesController {
    async getAll(req, res) {
        try {
            const offenses = await Offense.findAll({
                include: [{ model: Student, include: [{ model: Group }] }],
            });

            return res.json(offenses);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки правонарушений" });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id правонарушения" });
        }

        try {
            const offense = await Offense.findOne({ where: { id: id }, include: [{ model: Student, include: [{ model: Group }] }] });

            if (offense == null) {
                return res.status(404).json({ error: "Правонарушения не существует" });
            }

            return res.json(offense);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки правонарушения" });
        }
    }

    async post(req, res) {
        const offense = { ...req.body };

        try {
            const createdOffense = await Offense.create(offense);

            return res.status(201).json(createdOffense);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время создания правонарушения" });
        }
    }

    async put(req, res) {
        const { id } = req.params;

        const offense = { ...req.body };

        if (isNaN(id) || parseInt(id) !== offense.id) {
            return res.sendStatus(400);
        }

        if (Offense.findOne({ where: { id: id } }) == null) {
            return res.status(404).json({ error: "Правонарушения не существует" });
        }

        try {
            await Offense.update(offense, { where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время изменения правонарушения" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id правонарушения" });
        }

        if ((await Offense.findOne({ where: { id: id } })) == null) {
            return res.status(404).json({ error: "Правонарушения не существует" });
        }

        try {
            await Offense.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время удаления правонарушения" });
        }
    }
}

module.exports = new OffensesController();
