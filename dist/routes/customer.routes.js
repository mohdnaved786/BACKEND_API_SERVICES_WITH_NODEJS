"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("../controllers/customer.controller");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// router.post("/", createCustomer);
router.post("/", upload_1.uploadCustomer.single("photo"), // 👈 VERY IMPORTANT
customer_controller_1.createCustomer);
router.get("/", customer_controller_1.getAllCustomers);
router.get("/:id", customer_controller_1.getCustomerById);
router.put("/:id", customer_controller_1.updateCustomer);
router.delete("/:id", customer_controller_1.deleteCustomer);
router.patch("/:id/assign-agent", customer_controller_1.assignAgent);
router.patch("/:id/status", customer_controller_1.changeCustomerStatus);
exports.default = router;
