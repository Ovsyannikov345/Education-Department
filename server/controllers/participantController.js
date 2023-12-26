const { Participant } = require("../db/models");

class ParticipantController {
    async getAll(req, res) {
        try {
            const participants = await Participant.findAll();

            return res.json(participants);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async create(req, res) {
        const participant = { ...req.body };

        try {
            const result = await Participant.create(participant);

            return res.status(201).json(result);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.sendStatus(400);
        }

        if ((await Participant.findOne({ where: { id: id } })) == null) {
            return res.sendStatus(404);
        }

        try {
            await Participant.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = new ParticipantController();
