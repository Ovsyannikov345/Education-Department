const { Router } = require("express");
const groupController = require("../../controllers/groupController");

const router = new Router();

router.get("", groupController.getAll);
router.post("", groupController.create);
router.delete("/:id", groupController.delete);

module.exports = router;
