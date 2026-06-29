import {z} from "zod";

export const createUrlSchema = z.object({
    originalUrl: z.url(),
});

export const shortCodeSchema = z.object({
    shortCode: z.string().min(6).max(10),
});