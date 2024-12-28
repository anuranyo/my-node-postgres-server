const pool = require('../db/connection');

class UserContactInfoModel {
  // Получить всю контактную информацию
  static async getAllUserContactInfos() {
    const query = 'SELECT * FROM public."UserContactInfo"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить контактную информацию по ID
  static async getUserContactInfoById(id) {
    const query = 'SELECT * FROM public."UserContactInfo" WHERE contact_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую контактную информацию
  static async createUserContactInfo({ user_id, email, phone, status }) {
    const query = `
      INSERT INTO public."UserContactInfo" (user_id, email, phone, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, email, phone, status]);
    return rows[0];
  }

  // Обновить контактную информацию по ID
  static async updateUserContactInfo(id, { user_id, email, phone, status }) {
    const query = `
      UPDATE public."UserContactInfo"
      SET user_id = $1, email = $2, phone = $3, status = $4
      WHERE contact_id = $5
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, email, phone, status, id]);
    return rows[0];
  }

  // Удалить контактную информацию по ID
  static async deleteUserContactInfo(id) {
    const query = 'DELETE FROM public."UserContactInfo" WHERE contact_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = UserContactInfoModel;
