const { Router } = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = new Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/forgot-password", userController.sendPasswordToEmail);

module.exports = router;
