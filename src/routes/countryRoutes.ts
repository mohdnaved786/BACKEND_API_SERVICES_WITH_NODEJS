import { Router } from "express";
import { getDummyCountries } from "../controllers/countryController";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/getAllCountries", authMiddleware, getDummyCountries);


export default router;
