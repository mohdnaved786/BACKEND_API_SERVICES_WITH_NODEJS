import { Router } from "express";
import { updateProfile, getProfile } from "../controllers/user.controller";

const router = Router();

router.get("/profile/:id", getProfile);   // GET user profile
router.put("/profile/:id", updateProfile); // UPDATE user profile

export default router;
