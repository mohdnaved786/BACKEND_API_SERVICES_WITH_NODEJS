import { Router } from "express";
import multer from "multer";
const upload = multer();
import {
    getAllUsers,
    getProfile,
    updateProfile,
    createUser,
    deleteUser
} from "../controllers/user.controller";

import { uploadUserPhoto } from "../middleware/userUpload";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/profile/:id", authMiddleware, getProfile);
router.put("/profile/:id", authMiddleware, upload.none(), updateProfile);

// NEW ROUTES
router.post("/create", uploadUserPhoto.single("photo"), createUser);
router.delete("/:id", deleteUser);

export default router;
