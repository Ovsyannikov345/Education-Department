// const { Invitees } = require("../models/models");
// const ApiError = require("../error/ApiError");

// class InvitesController {
//     async create(req, res) {
//         const { full_name, position, organization } = req.body;
//         const invite = await Invitees.create({
//             full_name,
//             position,
//             organization,
//         });
//         return res.json(invite);
//     }

//     async getOneByName(req, res) {}

//     async getAll(req, res) {
//         let result;
//         result = await Invitees.findAll();
//         return res.json(result);
//     }
// }

// module.exports = new InvitesController();
