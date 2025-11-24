const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: "User already exists", status: 0 });

    const user = new User({
      email,
      password: hashPassword(password),
    });

    await user.save();
    res.status(201).json({ message: "User created", status: 1 });
  } catch (err) {
    res.status(500).json({ message: err.message, status: 0 });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== hashPassword(password))
      return res
        .status(400)
        .json({ message: "Invalid credentials", status: 0 });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, status: 1 });
  } catch (err) {
    res.status(500).json({ message: err.message, status: 0 });
  }
};
