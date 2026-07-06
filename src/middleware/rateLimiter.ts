import rateLimit from "express-rate-limit";
import { success } from "zod";

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message:{
        success: false,
        err:"Request Limit exceeded",
        message: "Too many requests. Please try again after 15 minutes.",
    }
});
