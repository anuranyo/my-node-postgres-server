const pool = require('../db/connection');

class UserTagsModel {
  // Получить все связи тегов с пользователями
  static async getAllUserTags() {
    const query = 'SELECT * FROM public."UserTags"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить связь тегов с пользователем по ID
  static async getUserTagById(id) {
    const query = 'SELECT * FROM public."UserTags" WHERE user_tag_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать связь тегов с пользователем
  static async createUserTag({ user_id, tag_id }) {
    const query = `
      INSERT INTO public."UserTags" (user_id, tag_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tag_id]);
    return rows[0];
  }

  // Обновить связь тегов с пользователем по ID
  static async updateUserTag(id, { user_id, tag_id }) {
    const query = `
      UPDATE public."UserTags"
      SET user_id = $1, tag_id = $2
      WHERE user_tag_id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tag_id, id]);
    return rows[0];
  }

  // Удалить связь тегов с пользователем по ID
  static async deleteUserTag(id) {
    const query = 'DELETE FROM public."UserTags" WHERE user_tag_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = UserTagsModel;
