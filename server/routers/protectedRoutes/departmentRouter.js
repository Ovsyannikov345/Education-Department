const { Router } = require("express");
const departmentController = require("../../controllers/departmentController");

const router = new Router();

router.get("", departmentController.getAll);

module.exports = router;
