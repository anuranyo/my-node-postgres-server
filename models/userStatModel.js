const pool = require('../db/connection');

class UserStatsModel {
  // Получить всю статистику пользователей
  static async getAllUserStats() {
    const query = 'SELECT * FROM public."userstats"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить статистику пользователя по ID
  static async getUserStatById(id) {
    const query = 'SELECT * FROM public."userstats" WHERE stats_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую статистику пользователя
  static async createUserStat({ user_id, tasks, friends_count, done_projects }) {
    const query = `
      INSERT INTO public."userstats" (user_id, tasks, friends_count, done_projects)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks, friends_count, done_projects]);
    return rows[0];
  }

  // Обновить статистику пользователя по ID
  static async updateUserStat(id, { user_id, tasks, friends_count, done_projects }) {
    const query = `
      UPDATE public."userstats"
      SET user_id = $1, tasks = $2, friends_count = $3, done_projects = $4
      WHERE stats_id = $5
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks, friends_count, done_projects, id]);
    return rows[0];
  }

  // Удалить статистику пользователя по ID
  static async deleteUserStat(id) {
    const query = 'DELETE FROM public."userstats" WHERE stats_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

    // Получить статистику по user_id
    static async getStatsByUserId(userId) {
      const query = `
        SELECT us.*
        FROM public.userstats us
        JOIN public."Users" u ON us.user_id = u.user_id
        WHERE us.user_id = $1;
      `;
      const { rows } = await pool.query(query, [userId]);
      return rows;
    }
}

module.exports = UserStatsModel;
