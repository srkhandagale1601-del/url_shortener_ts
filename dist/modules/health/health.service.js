"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthService = void 0;
const getHealthService = async () => {
    const isHealthy = true;
    if (isHealthy) {
        return {
            status: "UP",
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        };
    }
};
exports.getHealthService = getHealthService;
//# sourceMappingURL=health.service.js.map