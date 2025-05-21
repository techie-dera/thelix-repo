import { Request, Response } from "express";
import taskService from "../services/taskService";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await taskService.createTask(title, description);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};

export const markTaskAsDone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.markTaskAsDone(Number(id));
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};