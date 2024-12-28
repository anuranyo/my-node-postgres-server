const TasksModel = require('../models/TasksModel');
const pool = require('../db/connection'); 

// Получить все задачи
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await TasksModel.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Получить задачу по ID
exports.getTaskById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const task = await TasksModel.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Создать новую задачу
exports.createTask = async (req, res, next) => {
  const { user_id, title, status } = req.body;
  try {
    const newTask = await TasksModel.createTask({ user_id, title, status });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Обновить задачу по ID
exports.updateTask = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, title, status } = req.body;
  try {
    const updatedTask = await TasksModel.updateTask(id, { user_id, title, status });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Удалить задачу по ID
exports.deleteTask = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedTask = await TasksModel.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
