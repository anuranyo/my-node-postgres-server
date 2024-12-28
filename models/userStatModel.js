const pool = require('../db/connection');

class UserStatsModel {
  // Получить всю статистику пользователей
  static async getAllUserStats() {
    const query = 'SELECT * FROM public."UserStats"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить статистику пользователя по ID
  static async getUserStatById(id) {
    const query = 'SELECT * FROM public."UserStats" WHERE stats_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую статистику пользователя
  static async createUserStat({ user_id, tasks, friends_count, done_projects }) {
    const query = `
      INSERT INTO public."UserStats" (user_id, tasks, friends_count, done_projects)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks, friends_count, done_projects]);
    return rows[0];
  }

  // Обновить статистику пользователя по ID
  static async updateUserStat(id, { user_id, tasks, friends_count, done_projects }) {
    const query = `
      UPDATE public."UserStats"
      SET user_id = $1, tasks = $2, friends_count = $3, done_projects = $4
      WHERE stats_id = $5
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks, friends_count, done_projects, id]);
    return rows[0];
  }

  // Удалить статистику пользователя по ID
  static async deleteUserStat(id) {
    const query = 'DELETE FROM public."UserStats" WHERE stats_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = UserStatsModel;
