import { Router } from "express";
import * as UserController from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createUploader } from "../../middlewares/upload.middleware.js";
const router = Router();
const uploadUserImage = createUploader({ folder: "users", type: "image" });
// Public routes
router.post("/register", UserController.signup);
router.post("/login", UserController.login);
// Protected routes
router.get("/me", authMiddleware, UserController.getMe);
router.post("/adduser", authMiddleware, UserController.createUser);
router.post("/userphoto", authMiddleware, uploadUserImage.single("file"), UserController.uploadUserImage);
router.get("/getuser", authMiddleware, UserController.getUserList);
export default router;
