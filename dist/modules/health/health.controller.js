"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const health_service_1 = require("./health.service");
const getHealth = async (req, res) => {
    try {
        const health = await (0, health_service_1.getHealthService)();
        res.status(200).json(health);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(503).json({
            status: "DOWN",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            error: errorMessage
        });
    }
};
exports.getHealth = getHealth;
//# sourceMappingURL=health.controller.js.map