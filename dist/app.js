"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_routes_1 = __importDefault(require("./modules/url/url.routes"));
const health_routes_1 = __importDefault(require("./modules/health/health.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./middleware/logger");
const rateLimiter_1 = require("./middleware/rateLimiter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_1.logger);
app.use(rateLimiter_1.rateLimiter);
app.use("/urls", url_routes_1.default);
app.use("/health", health_routes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map