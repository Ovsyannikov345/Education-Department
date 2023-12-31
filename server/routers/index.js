const { Router } = require("express");
const eventRouter = require("./eventRouter");
const departmentRouter = require("./departmentRouter");
const directionRouter = require("./directionRouter");
const employeeRouter = require("./employeeRouter");
const studentRouter = require("./studentRouter");
const participantRouter = require("./participantRouter");
const offensesRouter = require("./offensesRouter");

const router = new Router();

router.use("/events", eventRouter);
router.use("/departments", departmentRouter);
router.use("/directions", directionRouter);
router.use("/employees", employeeRouter);
router.use("/students", studentRouter);
router.use("/participants", participantRouter);
router.use("/offenses", offensesRouter);

module.exports = router;
