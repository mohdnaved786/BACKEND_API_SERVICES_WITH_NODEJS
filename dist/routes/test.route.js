"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public route
router.get("/public", (req, res) => {
    res.json({ message: "This is a PUBLIC API. No token needed." });
});
// Private route
router.get("/private", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({
        message: "You are authorized!",
        user: req.user, // user info from JWT
    });
});
exports.default = router;
