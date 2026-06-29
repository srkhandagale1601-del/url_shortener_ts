import express from "express";
import urlRoutes from "./modules/url/url.routes";
import { errorHandler } from "./middleware/errorHandler";
const app = express();

app.use(express.json());



app.use("/urls",urlRoutes);
app.use(errorHandler);
export default app;