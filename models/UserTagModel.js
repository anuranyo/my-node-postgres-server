const pool = require('../db/connection');

class UserTagsModel {
  // Получить все связи тегов с пользователями
  static async getAllUserTags() {
    const query = 'SELECT * FROM public."usertags"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить связь тегов с пользователем по ID
  static async getUserTagById(id) {
    const query = 'SELECT * FROM public."usertags" WHERE user_tag_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать связь тегов с пользователем
  static async createUserTag({ user_id, tag_id }) {
    const query = `
      INSERT INTO public."usertags" (user_id, tag_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tag_id]);
    return rows[0];
  }

  // Обновить связь тегов с пользователем по ID
  static async updateUserTag(id, { user_id, tag_id }) {
    const query = `
      UPDATE public."usertags"
      SET user_id = $1, tag_id = $2
      WHERE user_tag_id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tag_id, id]);
    return rows[0];
  }

  // Удалить связь тегов с пользователем по ID
  static async deleteUserTag(id) {
    const query = 'DELETE FROM public."usertags" WHERE user_tag_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Получить все теги по user_id
  static async getAllUserTagsByUserId(userId) {
    const query = `
      SELECT ut.user_tag_id, ut.user_id, ut.tag_id, t.tag_name
      FROM public."usertags" ut
      INNER JOIN public."tags" t ON ut.tag_id = t.tag_id
      WHERE ut.user_id = $1
    `;
    try {
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      console.error('Error fetching user tags by user ID:', error);
      throw error;
    }
  }

}

module.exports = UserTagsModel;
