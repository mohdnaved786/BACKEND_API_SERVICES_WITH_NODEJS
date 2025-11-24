const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session"); // ✅ import session
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Add this before your routes
app.use(
  session({
    secret: "your-secret-key", // change this in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);

const authRoutes = require("./routes/authRoutes");
const dummyUserRoutes = require("./routes/dummyUserRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/dummy-users", dummyUserRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
