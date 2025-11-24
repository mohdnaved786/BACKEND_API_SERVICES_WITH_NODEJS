const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const {getCaptcha, verifyCaptcha} = require("../controllers/captchaController");

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/getCaptcha", getCaptcha);
router.post("/verifyCaptcha", verifyCaptcha);

module.exports = router;
