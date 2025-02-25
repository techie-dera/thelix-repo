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
exports.markTaskAsDone = exports.createTask = exports.getTasks = void 0;
const taskService_1 = __importDefault(require("../services/taskService"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskService_1.default.getTasks();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title)
            return res.status(400).json({ message: "Title is required" });
        const task = yield taskService_1.default.createTask(title, description);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createTask = createTask;
const markTaskAsDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield taskService_1.default.markTaskAsDone(Number(id));
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.markTaskAsDone = markTaskAsDone;
