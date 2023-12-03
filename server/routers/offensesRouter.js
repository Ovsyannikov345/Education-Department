const { Router } = require("express");
const offensesController = require("../controllers/offensesController");

const router = new Router();

router.get("", offensesController.getAll);
router.post("", offensesController.post);
router.delete("/:id", offensesController.delete);

module.exports = router;
