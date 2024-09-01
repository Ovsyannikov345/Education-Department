const { Router } = require("express");
const publicRouter = require("./publicRouter");
const protectedRouter = require("./protectedRouter");
const { validateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.use("/api/auth", publicRouter);
router.use("/api", validateToken, protectedRouter);


module.exports = router;
