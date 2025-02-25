"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("../models/task"));
class TaskService {
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.default.findAll({
                where: { completed: false },
                order: [["createdAt", "DESC"]],
                limit: 5,
            });
        });
    }
    createTask(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.default.create({ title, description });
        });
    }
    markTaskAsDone(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield task_1.default.findByPk(taskId);
            if (!task)
                throw new Error("Task not found");
            task.completed = true;
            yield task.save();
            return task;
        });
    }
}
exports.default = new TaskService();
