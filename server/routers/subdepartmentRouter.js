const { Router } = require("express");
const subdepartmentController = require("../controllers/subdepartmentController");

const router = new Router();

router.get("", subdepartmentController.getAll);

module.exports = router;
