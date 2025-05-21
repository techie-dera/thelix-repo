"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
// Correctly typing the request and response objects
router.get("/tasks", async (req, res) => {
    await (0, taskController_1.getTasks)(req, res);
});
router.post("/tasks", async (req, res) => {
    await (0, taskController_1.createTask)(req, res);
});
router.patch("/tasks/:id", async (req, res) => {
    await (0, taskController_1.markTaskAsDone)(req, res);
});
exports.default = router;
