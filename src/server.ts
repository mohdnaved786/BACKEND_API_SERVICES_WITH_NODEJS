// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const session = require("express-session"); // ✅ import session
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ Add this before your routes
// app.use(
//   session({
//     secret: "your-secret-key", // change this in production
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // set to true if using HTTPS
//   })
// );

// const authRoutes = require("./routes/authRoutes");
// const dummyUserRoutes = require("./routes/dummyUserRoutes");
// app.use("/api/auth", authRoutes);
// app.use("/api/dummy-users", dummyUserRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/test.route";
import productRoutes from "./routes/product.route";
import path from "path";
import userRoutes from "./routes/user.route";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
// app.use(morgan("dev"));

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/products", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/users", userRoutes);

// Start server
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB Connected!");

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
