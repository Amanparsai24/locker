import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./features/users/user.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// File upload
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
