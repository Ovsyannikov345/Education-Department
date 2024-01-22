const { Router } = require("express");
const directionController = require("../../controllers/directionController");

const router = new Router();

router.get("", directionController.getAll);

module.exports = router;
