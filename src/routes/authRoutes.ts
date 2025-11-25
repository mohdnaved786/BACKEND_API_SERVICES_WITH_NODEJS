// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/authController");
// const {getCaptcha, verifyCaptcha} = require("../controllers/captchaController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);


// router.get("/getCaptcha", getCaptcha);
// router.post("/verifyCaptcha", verifyCaptcha);

// module.exports = router;


import express from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
