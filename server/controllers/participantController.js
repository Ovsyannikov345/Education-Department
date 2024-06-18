const { Participant } = require("../db/models");

class ParticipantController {
    async getAll(req, res) {
        try {
            const participants = await Participant.findAll();

            return res.json(participants);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки приглашенных лиц" });
        }
    }

    async create(req, res) {
        const participant = { ...req.body };

        try {
            const result = await Participant.create(participant);

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время создания приглашенного лица" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id приглашенного лица" });
        }

        if ((await Participant.findOne({ where: { id: id } })) == null) {
            return res.status(404).json({ error: "Приглашенного лица не существует" });
        }

        try {
            await Participant.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время удаления приглашенного лица" });
        }
    }
}

module.exports = new ParticipantController();
