const { Participant } = require("../db/models");

class ParticipantController {
    async getAll(req, res) {
        try {
            const participants = await Participant.findAll();

            return res.json(participants);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки участников" });
        }
    }

    async create(req, res) {
        const participant = { ...req.body };

        try {
            const result = await Participant.create(participant);

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время создания участника" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id участника" });
        }

        if ((await Participant.findOne({ where: { id: id } })) == null) {
            return res.status(404).json({ error: "Участника не существует" });
        }

        try {
            await Participant.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время удаления участника" });
        }
    }
}

module.exports = new ParticipantController();
