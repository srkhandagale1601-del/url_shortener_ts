import express from "express";
import urlRoutes from "./modules/url/url.routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { rateLimitter } from "./middleware/rateLimitter";
const app = express();

app.use(express.json());
app.use(logger);
app.use(rateLimitter);
app.use("/urls",urlRoutes);
app.use("/api/url",urlRoutes);
app.use(errorHandler);
export default app;