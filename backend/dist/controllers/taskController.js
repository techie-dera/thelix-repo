"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markTaskAsDone = exports.createTask = exports.getTasks = void 0;
const taskService_1 = __importDefault(require("../services/taskService"));
const getTasks = async (req, res) => {
    try {
        const tasks = await taskService_1.default.getTasks();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title)
            return res.status(400).json({ message: "Title is required" });
        const task = await taskService_1.default.createTask(title, description);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createTask = createTask;
const markTaskAsDone = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService_1.default.markTaskAsDone(Number(id));
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.markTaskAsDone = markTaskAsDone;
