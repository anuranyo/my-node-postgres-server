const pool = require('../db/connection');

class UserContactInfoModel {
  // Получить всю контактную информацию
  static async getAllUserContactInfos() {
    const query = 'SELECT * FROM public."usercontactinfo"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить контактную информацию по ID
  static async getUserContactInfoById(id) {
    const query = 'SELECT * FROM public."usercontactinfo" WHERE contact_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую контактную информацию
  static async createUserContactInfo({ user_id, email, phone, status }) {
    const query = `
      INSERT INTO public."usercontactinfo" (user_id, email, phone, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, email, phone, status]);
    return rows[0];
  }

  // Обновить контактную информацию по ID
  static async updateUserContactInfo(id, { user_id, email, phone, status }) {
    const query = `
      UPDATE public."usercontactinfo"
      SET user_id = $1, email = $2, phone = $3, status = $4
      WHERE contact_id = $5
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, email, phone, status, id]);
    return rows[0];
  }

  // Удалить контактную информацию по ID
  static async deleteUserContactInfo(id) {
    const query = 'DELETE FROM public."usercontactinfo" WHERE contact_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Получить всю контактную информацию по user_id
  static async getAllUserContactInfosByUserId(userId) {
    const query = 'SELECT * FROM public."usercontactinfo" WHERE user_id = $1';
    try {
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      console.error('Error fetching user contact info by user ID:', error);
      throw error;
    }
  }

  
}


module.exports = UserContactInfoModel;
