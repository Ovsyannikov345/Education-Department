// const { Student } = require("../models/models");
// const ApiError = require("../error/ApiError");

// class StudentController {
//     async getAll(req, res) {
//         const result = await Student.findAll();
//         return res.json(result);
//     }

//     async getOne(req, res) {
//         const { id } = req.params;
//         const result = await Student.findOne({
//             where: { id },
//         });
//         return res.json(result);
//     }

//     async create(req, res) {
//         const { full_name, group_name } = req.body;
//         const student = await Student.create({ full_name, group_name });
//         return res.json(student);
//     }
// }

// module.exports = new StudentController();
