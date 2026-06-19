import express from "express";
import urlRoutes from "./modules/url/url.routes.ts";
const app = express();

app.use(express.json());



app.use("/urls",urlRoutes);

export default app;