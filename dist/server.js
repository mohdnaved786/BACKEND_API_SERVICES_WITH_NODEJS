"use strict";
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const session = require("express-session"); // ✅ import session
// const connectDB = require("./config/db");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const test_route_1 = __importDefault(require("./routes/test.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const path_1 = __importDefault(require("path"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const countryRoutes_1 = __importDefault(require("./routes/countryRoutes"));
const agent_routes_1 = __importDefault(require("./routes/agent.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const otp_routes_1 = __importDefault(require("./routes/otp.routes"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
// app.use(morgan("dev"));
// Sample route
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/test", test_route_1.default);
app.use("/api/products", product_route_1.default);
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use('/uploads/users', express_1.default.static(path_1.default.join(__dirname, 'uploads/users')));
app.use("/api/users", user_route_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/countries", countryRoutes_1.default);
app.use("/api/agents", agent_routes_1.default);
app.use("/api/messages", message_routes_1.default);
app.use("/api/otp", otp_routes_1.default);
app.use("/api/customers", customer_routes_1.default);
// Start server
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB Connected!");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
    .catch((err) => console.log(err));
