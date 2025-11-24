// Helper to generate random captcha string
const generateCaptchaText = (length = 6) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < length; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

// GET /api/captcha - returns text captcha as JSON
exports.getCaptcha = (req, res) => {
  try {
    const captchaText = generateCaptchaText();
    req.session.captcha_text = captchaText;

    res.json({
      captcha: captchaText, // ⚠️ For real use, don't expose this — send an image or distort it
      message: "Captcha generated",
      status: 1,
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating captcha", status: 0 });
  }
};

// POST /api/verify-captcha - checks user input
exports.verifyCaptcha = (req, res) => {
  const { captcha } = req.body;

  if (!captcha) {
    return res
      .status(400)
      .json({ success: false, message: "Captcha is required", status: 0 });
  }

  if (req.session.captcha_text === captcha) {
    return res.json({ success: true, message: "Captcha matched", status: 1 });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Captcha does not match", status: 0 });
  }
};
