const pool = require('../db/connection');

class UserTaskSummaryModel {
  // Получить все сводки задач пользователей
  static async getAllUserTaskSummaries() {
    const query = 'SELECT * FROM public."UserTaskSummary"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить сводку задач пользователя по ID
  static async getUserTaskSummaryById(id) {
    const query = 'SELECT * FROM public."UserTaskSummary" WHERE summary_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую сводку задач пользователя
  static async createUserTaskSummary({ user_id, tasks_completed, tasks_left }) {
    const query = `
      INSERT INTO public."UserTaskSummary" (user_id, tasks_completed, tasks_left)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks_completed, tasks_left]);
    return rows[0];
  }

  // Обновить сводку задач пользователя по ID
  static async updateUserTaskSummary(id, { user_id, tasks_completed, tasks_left }) {
    const query = `
      UPDATE public."UserTaskSummary"
      SET user_id = $1, tasks_completed = $2, tasks_left = $3
      WHERE summary_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks_completed, tasks_left, id]);
    return rows[0];
  }

  // Удалить сводку задач пользователя по ID
  static async deleteUserTaskSummary(id) {
    const query = 'DELETE FROM public."UserTaskSummary" WHERE summary_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = UserTaskSummaryModel;