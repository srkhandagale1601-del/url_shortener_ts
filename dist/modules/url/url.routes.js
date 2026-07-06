"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_controller_1 = require("./url.controller");
const validate_1 = require("../../middleware/validate");
const url_validation_1 = require("./url.validation");
const asyncHandler_1 = require("../../middleware/asyncHandler");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(url_validation_1.createUrlSchema), (0, asyncHandler_1.asyncHandler)(url_controller_1.createUrl));
router.get("/:shortCode", (0, validate_1.validate)(url_validation_1.shortCodeSchema, "params"), (0, asyncHandler_1.asyncHandler)(url_controller_1.redirectUrl));
router.get("/:shortCode/stats", (0, validate_1.validate)(url_validation_1.shortCodeSchema, "params"), (0, asyncHandler_1.asyncHandler)(url_controller_1.getUrlStats));
exports.default = router;
//# sourceMappingURL=url.routes.js.map