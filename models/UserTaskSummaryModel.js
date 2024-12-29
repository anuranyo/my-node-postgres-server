const pool = require('../db/connection');

class UserTaskSummaryModel {
  // Получить все сводки задач пользователей
  static async getAllUserTaskSummaries() {
    const query = 'SELECT * FROM public."usertasksummary"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить сводку задач пользователя по ID
  static async getUserTaskSummaryById(id) {
    const query = 'SELECT * FROM public."usertasksummary" WHERE summary_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую сводку задач пользователя
  static async createUserTaskSummary({ user_id, tasks_completed, tasks_left }) {
    const query = `
      INSERT INTO public."usertasksummary" (user_id, tasks_completed, tasks_left)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks_completed, tasks_left]);
    return rows[0];
  }

  // Обновить сводку задач пользователя по ID
  static async updateUserTaskSummary(id, { user_id, tasks_completed, tasks_left }) {
    const query = `
      UPDATE public."usertasksummary"
      SET user_id = $1, tasks_completed = $2, tasks_left = $3
      WHERE summary_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks_completed, tasks_left, id]);
    return rows[0];
  }

  // Удалить сводку задач пользователя по ID
  static async deleteUserTaskSummary(id) {
    const query = 'DELETE FROM public."usertasksummary" WHERE summary_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Получить все сводки задач по user_id
  static async getAllUserTaskSummariesByUserId(userId) {
    const query = 'SELECT * FROM public."usertasksummary" WHERE user_id = $1';
    try {
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      console.error('Error fetching user task summaries by user ID:', error);
      throw error;
    }
} 

}

module.exports = UserTaskSummaryModel;