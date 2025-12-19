import { Router } from "express";
import {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    assignAgent,
    changeCustomerStatus
} from "../controllers/customer.controller";
import { uploadCustomer } from "../middleware/upload";

const router = Router();

// router.post("/", createCustomer);
router.post(
    "/",
    uploadCustomer.single("photo"), // 👈 VERY IMPORTANT
    createCustomer
);
router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.patch("/:id/assign-agent", assignAgent);
router.patch("/:id/status", changeCustomerStatus);

export default router;
