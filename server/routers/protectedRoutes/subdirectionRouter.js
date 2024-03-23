const { Router } = require("express");
const subdirectionController = require("../../controllers/subdirectionController");

const router = new Router();

router.get("", subdirectionController.getAll);

module.exports = router;
