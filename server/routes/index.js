const { Router } = require("express");
const router = new Router();
const subdivision = require("./subdivisionsRouter");
const userRouter = require("./userRouter");
const eventRouter = require("./eventRouter");
const offensesRouter = require("./offensesRouter");
const organizers = require("./organizersRouter");
const invitees = require("./invitesRouter");
const event_invitees = require("./eventInvitesRouter");
const studentRouter = require("./studentRouter");

// router.use("/user", userRouter);
router.use("/events", eventRouter);
// router.use("/offenses", offensesRouter);
// router.use("/subdivisions", subdivision);
// router.use("/organizers", organizers);
// router.use("/invites", invitees);
// router.use("/eventinvite", event_invitees);св 
// router.use("/student", studentRouter);

module.exports = router;
