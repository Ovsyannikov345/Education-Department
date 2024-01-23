const { Router } = require("express");
const userController = require("../../controllers/userController");

const router = new Router();

router.get("", userController.getAll);
router.post("", userController.create);
router.post("/:id/block", userController.block);
router.post("/:id/unblock", userController.unblock);

module.exports = router;
