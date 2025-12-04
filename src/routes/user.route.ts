import { Router } from "express";
import { updateProfile, getProfile, getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/profile/:id", getProfile);   // GET user profile
router.put("/profile/:id", updateProfile); // UPDATE user profile

export default router;
