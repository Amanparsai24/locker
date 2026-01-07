import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./features/users/user.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
