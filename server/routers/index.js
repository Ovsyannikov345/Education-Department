const { Router } = require("express");
const publicRouter = require("./publicRouter");
const protectedRouter = require("./protectedRouter");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = new Router();

router.use("/api", authMiddleware, protectedRouter);
router.use(publicRouter);

module.exports = router;
