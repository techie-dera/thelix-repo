import express, { Request, Response } from "express";
import { getTasks, createTask, markTaskAsDone } from "../controllers/taskController";

const router = express.Router();

// Correctly typing the request and response objects
router.get("/tasks", async (req: Request, res: Response) => {
  await getTasks(req, res);
});

router.post("/tasks", async (req: Request, res: Response) => {
  await createTask(req, res);
});

router.patch("/tasks/:id", async (req: Request, res: Response) => {
  await markTaskAsDone(req, res);
});

export default router;
