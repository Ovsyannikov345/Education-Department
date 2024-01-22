const { Router } = require("express");
const studentController = require("../../controllers/studentController");

const router = new Router();

router.get("", studentController.getAll);
router.post("", studentController.create);
router.delete("/:id", studentController.delete);

module.exports = router;
