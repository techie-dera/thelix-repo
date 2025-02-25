import { Request, Response } from "express";
import taskService from "../services/taskService";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await taskService.createTask(title, description);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markTaskAsDone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.markTaskAsDone(Number(id));
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};