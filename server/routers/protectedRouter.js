const { Router } = require("express");
const eventRouter = require("./protectedRoutes/eventRouter");
const departmentRouter = require("./protectedRoutes/departmentRouter");
const directionRouter = require("./protectedRoutes/directionRouter");
const employeeRouter = require("./protectedRoutes/employeeRouter");
const studentRouter = require("./protectedRoutes/studentRouter");
const participantRouter = require("./protectedRoutes/participantRouter");
const offensesRouter = require("./protectedRoutes/offensesRouter");

const router = new Router();

router.use("/events", eventRouter);
router.use("/departments", departmentRouter);
router.use("/directions", directionRouter);
router.use("/employees", employeeRouter);
router.use("/students", studentRouter);
router.use("/participants", participantRouter);
router.use("/offenses", offensesRouter);

module.exports = router;
