const pool = require('../db/connection');

class TasksModel {
  // Получить все задачи
  static async getAllTasks() {
    const query = 'SELECT * FROM public."tasks"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить задачу по ID
  static async getTaskById(id) {
    const query = 'SELECT * FROM public."tasks" WHERE task_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую задачу
  static async createTask({ user_id, title, status }) {
    const query = `
      INSERT INTO public."tasks" (user_id, title, status)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, title, status]);
    return rows[0];
  }

  // Обновить задачу по ID
  static async updateTask(id, { user_id, title, status }) {
    const query = `
      UPDATE public."tasks"
      SET user_id = $1, title = $2, status = $3
      WHERE task_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, title, status, id]);
    return rows[0];
  }

  // Удалить задачу по ID
  static async deleteTask(id) {
    const query = 'DELETE FROM public."tasks" WHERE task_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
  
  // Сортировка задач по deadline
  static async getTasksSortedByDeadline(order = 'ASC') {
    const query = `SELECT * FROM public."tasks" ORDER BY deadline ${order};`;
    const { rows } = await pool.query(query);
    return rows;
  }
  
  // Сортировка задач по status
  static async getTasksSortedByStatus(order = 'ASC') {
    const query = `SELECT * FROM public."tasks" ORDER BY status ${order};`;
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить все задачи для указанного user_id
  static async getAllTasksByID(userId) {
    const query = `
      SELECT *
      FROM public.tasks
      WHERE user_id = $1;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows; // Возвращаем массив задач
  }
}

module.exports = TasksModel;
