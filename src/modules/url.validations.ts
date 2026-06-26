import {z} from "zod";

export const createUrlSchema = z.object({
    originalUrl: z.url(),
});