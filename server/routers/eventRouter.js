const { Router } = require("express");
const eventController = require("../controllers/eventController");

const router = new Router();

router.get("", eventController.getAll);
router.get("/:id", eventController.getOne);
router.post("", eventController.create);
router.delete("/:id", eventController.delete);

module.exports = router;
