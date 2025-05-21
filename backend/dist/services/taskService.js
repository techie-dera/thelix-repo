"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("../models/task"));
class TaskService {
    async getTasks() {
        return await task_1.default.findAll({
            where: { completed: false },
            order: [["createdAt", "DESC"]],
            limit: 5,
        });
    }
    async createTask(title, description) {
        return await task_1.default.create({ title, description });
    }
    async markTaskAsDone(taskId) {
        const task = await task_1.default.findByPk(taskId);
        if (!task)
            throw new Error("Task not found");
        task.completed = true;
        await task.save();
        return task;
    }
}
exports.default = new TaskService();
