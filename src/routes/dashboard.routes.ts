import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const dashboardData = {
            totalAgents: {
                total: 25,
                online: 18,
                offline: 7,
            },

            totalCustomers: {
                total: 320,
                active: 290,
                inactive: 30,
            },

            todayMessages: {
                total: 85,
                replied: 60,
                notReplied: 25,
            },

            topCustomers: [
                { name: "John Doe", totalMessages: 52 },
                { name: "Emily Carter", totalMessages: 40 },
                { name: "Michael Smith", totalMessages: 37 },
            ],

            inactiveCustomers: [
                { name: "Adam Khan", lastActive: "20 days ago" },
                { name: "Rohan Patel", lastActive: "14 days ago" },
            ],

            latestMessages: [
                { from: "John", message: "Hello", time: "2 mins ago" },
                { from: "Sara", message: "Need help", time: "5 mins ago" },
                { from: "Mike", message: "Thanks!", time: "10 mins ago" }
            ]
        };

        return res.json({
            success: true,
            data: dashboardData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});

export default router;
