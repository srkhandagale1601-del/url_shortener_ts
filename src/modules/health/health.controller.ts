import { Request, Response } from "express";
import { getHealthService } from "./health.service";

export const getHealth = async (req: Request, res: Response) => {
    try {
        const health = await getHealthService();
        res.status(200).json(health);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(503).json({
            status: "DOWN",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            error: errorMessage
        });
    }
};