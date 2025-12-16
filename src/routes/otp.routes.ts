import { Router } from "express";
import { getOtp, validateOtp } from "../controllers/otp.controller";

const router = Router();

router.post("/getOtp", getOtp);
router.post("/validateOtp", validateOtp);

export default router;
