import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as productController from "../controllers/product.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

// Protected Routes
// router.post("/", authMiddleware, productController.createProduct);
router.post("/", authMiddleware, upload.single("image"), productController.createProduct);
router.get("/", authMiddleware, productController.getProducts);
router.get("/:id", authMiddleware, productController.getProductById);
// router.put("/:id", authMiddleware, productController.updateProduct);
router.put("/:id", authMiddleware, upload.single("image"), productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;
