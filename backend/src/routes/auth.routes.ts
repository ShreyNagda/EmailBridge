import { Router } from "express";
import {
  registerUser,
  loginUser,
  getMe,
  deleteUser,
  updateProfile,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  resendVerificationEmail,
  logoutUser,
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);
router.delete("/me", protect, deleteUser);
router.put("/profile", protect, updateProfile);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", protect, resendVerificationEmail);
router.put("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
