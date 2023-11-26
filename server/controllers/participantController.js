const { Participant } = require("../db/models");

class ParticipantController {
    async getAll(req, res) {
        const participants = await Participant.findAll();

        return res.json(participants);
    }

    async create(req, res) {
        const participant = { ...req.body };

        const result = await Participant.create(participant);

        return res.json(result.dataValues);
    }

    async delete(req, res) {
        const { id } = req.params;

        await Participant.destroy({ where: { id: id } });

        return res.json();
    }
}

module.exports = new ParticipantController();
