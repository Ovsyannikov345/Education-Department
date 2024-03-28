const { Router } = require("express");
const groupController = require("../../controllers/groupController");

const router = new Router();

router.get("", groupController.getAll);

module.exports = router;
