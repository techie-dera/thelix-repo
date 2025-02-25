import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", taskRoutes);

export default app;