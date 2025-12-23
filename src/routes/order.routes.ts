import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as orderController from "../controllers/order.controller";
import * as adminOrderController from "../controllers/admin.order.controller";

const router = Router();

// router.post("/createOrder", authMiddleware, orderController.createOrder);
// router.get("/getAllOrders", authMiddleware, orderController.getAllOrders);
// router.get("/getUserOrders/:userId", authMiddleware, orderController.getUserOrders);
// router.get("/getOrderById/:orderId", authMiddleware, orderController.getOrderById);
// router.patch("/updateOrderStatus/:orderId", authMiddleware, orderController.updateOrderStatus);



router.post("/createOrder", authMiddleware, orderController.placeOrder);
router.get("/getUserOrders/:userId", authMiddleware, orderController.myOrders);
router.get("/getOrderById/:orderId", authMiddleware, orderController.orderDetails);




// admin rights
router.get("/getAllOrders", authMiddleware, adminOrderController.getAllOrders);
router.patch("/updateOrderStatus/:orderId", authMiddleware, adminOrderController.updateOrderStatus);

export default router;
