const { Router } = require("express");
const offensesController = require("../../controllers/offensesController");

const router = new Router();

router.get("", offensesController.getAll);
router.get("/:id", offensesController.getOne);
router.post("", offensesController.post);
router.put("/:id", offensesController.put);
router.delete("/:id", offensesController.delete);

module.exports = router;
