import { Router } from "express";
import * as UserController from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const router = Router();
// Public routes
router.post("/register", UserController.signup);
router.post("/login", UserController.login);
// Protected routes
router.get("/me", authMiddleware, UserController.getMe);
export default router;
