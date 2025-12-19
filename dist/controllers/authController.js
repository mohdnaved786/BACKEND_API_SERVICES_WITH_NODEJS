"use strict";
// const User = require("../models/User");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check email exist
        const exists = await User_1.default.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "Email already exists" });
        // hash password
        const hashed = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name,
            email,
            password: hashed,
        });
        res.json({ message: "User registered successfully", status: 1, user });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "User not found" });
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid password" });
        // create token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            status: 1,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.userName,
                email: user.email,
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
};
exports.login = login;
