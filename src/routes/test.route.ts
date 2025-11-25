import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public route
router.get("/public", (req, res) => {
    res.json({ message: "This is a PUBLIC API. No token needed." });
});

// Private route
router.get("/private", authMiddleware, (req: any, res) => {
    res.json({
        message: "You are authorized!",
        user: req.user, // user info from JWT
    });
});

export default router;
