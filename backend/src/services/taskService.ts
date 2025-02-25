import Task from "../models/task";

class TaskService {
  async getTasks() {
    return await Task.findAll({
      where: { completed: false },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
  }

  async createTask(title: string, description?: string) {
    return await Task.create({ title, description });
  }

  async markTaskAsDone(taskId: number) {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");
    
    task.completed = true;
    await task.save();
    return task;
  }
}

export default new TaskService();