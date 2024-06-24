const { Router } = require("express");
const reportController = require("../../controllers/reportController");

const router = new Router();

router.get("/events", reportController.getEventsReport);
router.get("/offenses", reportController.getOffensesReport);

module.exports = router;
