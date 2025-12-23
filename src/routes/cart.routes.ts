import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as cartController from "../controllers/cart.controller";

const router = Router();

router.post("/addToCart", authMiddleware, cartController.addToCart);
router.get("/getCart", authMiddleware, cartController.getCart);
// router.put("/updateQuantity/:itemId", authMiddleware, cartController.updateQuantity);
router.delete("/removeItem/:itemId", authMiddleware, cartController.removeCartItem);
router.delete("/clearCart", authMiddleware, cartController.clearCart);

export default router;
