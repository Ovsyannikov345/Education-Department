const { Router } = require("express");
const employeeController = require("../../controllers/employeeController");

const router = new Router();

router.get("", employeeController.getAll);
router.post("", employeeController.create);
router.delete("/:id", employeeController.delete);

module.exports = router;
