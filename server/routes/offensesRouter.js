const { Router } = require("express");
const offensesContoroller = require("../controllers/offensesContoroller");
const router = new Router();

router.post("/create", offensesContoroller.create);
router.get("/all", offensesContoroller.getAll);
router.get("/:id", offensesContoroller.getOne);

module.exports = router;
