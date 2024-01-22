const { Router } = require("express");
const authController = require("../controllers/authController");

const router = new Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.delete("/logout", authController.logout);

module.exports = router;
