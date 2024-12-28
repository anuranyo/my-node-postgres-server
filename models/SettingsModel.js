const pool = require('../db/connection');

class SettingsModel {
  // Получить все настройки
  static async getAllSettings() {
    const query = 'SELECT * FROM public."settings"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить настройку по ID
  static async getSettingById(id) {
    const query = 'SELECT * FROM public."settings" WHERE setting_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую настройку
  static async createSetting({ user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth }) {
    const query = `
      INSERT INTO public."settings" (user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth]);
    return rows[0];
  }

  // Обновить настройку по ID
  static async updateSetting(id, { user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth }) {
    const query = `
      UPDATE public."settings"
      SET user_id = $1, is_verified = $2, submit_review = $3, get_task = $4, recommendations = $5, two_factor_auth = $6
      WHERE setting_id = $7
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth, id]);
    return rows[0];
  }

  // Удалить настройку по ID
  static async deleteSetting(id) {
    const query = 'DELETE FROM public."settings" WHERE setting_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = SettingsModel;
