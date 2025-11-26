import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as productController from "../controllers/product.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

// Protected Routes
// router.post("/", authMiddleware, productController.createProduct);
router.post("/createProduct", authMiddleware, upload.single("image"), productController.createProduct);
router.get("/getAllProducts", authMiddleware, productController.getProducts);
router.get("/getProductById/:id", authMiddleware, productController.getProductById);
// router.put("/:id", authMiddleware, productController.updateProduct);
router.put("/updateProduct/:id", authMiddleware, upload.single("image"), productController.updateProduct);
router.delete("/deleteProduct/:id", authMiddleware, productController.deleteProduct);

export default router;
