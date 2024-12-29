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

// Сортировать задачи по deadline
exports.getTasksSortedByDeadline = async (req, res, next) => {
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC'; // Определяем направление сортировки
  try {
    const tasks = await TasksModel.getTasksSortedByDeadline(order);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Сортировать задачи по status
exports.getTasksSortedByStatus = async (req, res, next) => {
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC'; // Определяем направление сортировки
  try {
    const tasks = await TasksModel.getTasksSortedByStatus(order);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.getAllTasksByID = async (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const tasks = await TasksModel.getAllTasksByID(userId);
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Получить все задачи по user_id
exports.getAllTasksByUserId = async (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const tasks = await TasksModel.getAllTasksByUserId(userId);

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
