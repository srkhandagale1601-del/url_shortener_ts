import { Router } from "express";
import { createUrl,redirectUrl,redirectById } from "./url.controller";

const router = Router();

router.post("/", createUrl);
router.get("/id/:id", redirectById);
router.get("/:shortCode", redirectUrl);

export default router;
