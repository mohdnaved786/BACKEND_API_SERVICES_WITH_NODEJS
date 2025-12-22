import { Router } from "express";
import { generateInvoice } from "../controllers/invoice.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/:orderId", authMiddleware, generateInvoice);

export default router;
