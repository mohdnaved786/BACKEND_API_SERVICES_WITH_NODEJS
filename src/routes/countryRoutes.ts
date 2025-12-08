import { Router } from "express";
import { getDummyCountries } from "../controllers/countryController";

const router = Router();

router.get("/getAllCountries", getDummyCountries);

export default router;
