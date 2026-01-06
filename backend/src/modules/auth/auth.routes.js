const router = require("express").Router();
const authController = require("./auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.me);

module.exports = router;
