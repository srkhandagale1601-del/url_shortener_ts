import express from "express";
import urlRoutes from "./modules/url/url.routes";
import healthRoutes from "./modules/health/health.routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { rateLimiter } from "./middleware/rateLimiter";
const app = express();

app.use(express.json());
app.use(logger);
app.use(rateLimiter);
app.use("/urls",urlRoutes);
app.use("/health",healthRoutes);
app.use(errorHandler);
export default app;