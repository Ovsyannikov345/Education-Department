const { Offense, Student } = require("../db/models");
const ApiError = require("../error/ApiError");

class OffensesController {
    async create(req, res) {
        const { studentId, article, offenseDate, courtDecision, penalty } =
            req.body;

        const offense = await Offense.create({
            studentId, // TODO remove
            article,
            offenseDate,
            courtDecision,
            penalty,
        });

        return res.json(offense);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const result = await Offense.findOne({
            where: { id: id },
            include: [
                { model: Student },
            ],
        });
        return res.json(result);
    }

    async getAll(req, res) {
        const result = await Offense.findAll({
            include: [
                { model: Student },
            ],
        });
        return res.json(result);
    }
}

module.exports = new OffensesController();
