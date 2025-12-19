"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const user_controller_1 = require("../controllers/user.controller");
const userUpload_1 = require("../middleware/userUpload");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authMiddleware, user_controller_1.getAllUsers);
router.get("/profile/:id", auth_middleware_1.authMiddleware, user_controller_1.getProfile);
router.put("/profile/:id", auth_middleware_1.authMiddleware, upload.none(), user_controller_1.updateProfile);
// NEW ROUTES
router.post("/create", userUpload_1.uploadUserPhoto.single("photo"), user_controller_1.createUser);
router.delete("/:id", user_controller_1.deleteUser);
router.patch("/:id/status", user_controller_1.updateUserStatus);
exports.default = router;
