// const { Subdivision } = require("../models/models");

// class SubdivisionController {
//     async getAll(req, res) {
//         let subdivisions;
//         subdivisions = await Subdivision.findAll();
//         return res.json(subdivisions);
//     }

//     async getOne(req, res) {
//         const { id } = req.params;
//         const subdivision = await Subdivision.findOne({ where: { id } });
//         return res.json(subdivision);
//     }

//     async create(req, res) {
//         const { name } = req.body;
//         const subdivision = await Subdivision.create({ name });
//         return res.json(subdivision);
//     }
// }

// module.exports = new SubdivisionController();
