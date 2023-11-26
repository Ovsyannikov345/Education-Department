const { Router } = require("express");
const participantController = require("../controllers/participantController");

const router = new Router();

router.get("", participantController.getAll);
router.post("", participantController.create);
router.delete("/:id", participantController.delete);

module.exports = router;
