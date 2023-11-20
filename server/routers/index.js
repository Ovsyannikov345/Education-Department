const { Router } = require("express");
const router = new Router();
const eventRouter = require("./eventRouter");
const departmentRouter = require("./departmentRouter");
const subdepartmentRouter = require("./subdepartmentRouter");
const directionRouter = require("./directionRouter");

router.use("/events", eventRouter);
router.use("/departments", departmentRouter);
router.use("/subdepartments", subdepartmentRouter);
router.use("/directions", directionRouter);

module.exports = router;
