"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortCodeSchema = exports.createUrlSchema = void 0;
const zod_1 = require("zod");
exports.createUrlSchema = zod_1.z.object({
    originalUrl: zod_1.z.url(),
    shortCode: zod_1.z.string().min(6).optional(),
});
exports.shortCodeSchema = zod_1.z.object({
    shortCode: zod_1.z.string().min(6).max(10),
});
//# sourceMappingURL=url.validation.js.map