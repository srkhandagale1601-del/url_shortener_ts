import { Router } from "express";
import { createUrl,redirectUrl} from "./url.controller";
import { validate } from "../../middleware/validate";
import { createUrlSchema,shortCodeSchema} from "./url.validation";
import { asyncHandler } from "../../middleware/asyncHandler";

const router = Router();

router.post("/", validate(createUrlSchema), asyncHandler(createUrl));
router.get("/:shortCode", validate(shortCodeSchema,"params"),redirectUrl);

export default router;
