import {z} from "zod";

export const createUrlSchema = z.object({
    originalUrl: z.url(),
    shortCode: z.string().min(6).optional(),
});

export const shortCodeSchema = z.object({
    shortCode: z.string().min(6).max(10),
});