const pool = require('../db/connection');

class UsersModel {
  // Получить всех пользователей
  static async getAllUsers() {
    const query = 'SELECT * FROM public."Users"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить пользователя по ID
  static async getUserById(id) {
    const query = 'SELECT * FROM public."Users" WHERE user_id = $1';
    const { rows } = await pool.query(query, [id]);
    const user = rows[0];
    if (user && user.profile_image) {
      user.profile_image = user.profile_image.toString('base64');
    }
    return user;
  }

  // Создать нового пользователя
  static async createUser({ username, full_name, email, password, dob, address, city, postal_code, country, profile_image }) {
    data.profile_image = data.profile_image ? Buffer.from(data.profile_image, 'base64') : null;
    const query = `
      INSERT INTO public."Users" (username, full_name, email, password, dob, address, city, postal_code, country, profile_image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, Object.values(data));
    return rows[0];
  }

  // Обновить пользователя по ID
  static async updateUser(id, { username, full_name, email, password, dob, address, city, postal_code, country, profile_image }) {
    const query = `
      UPDATE public."Users"
      SET username = $1, full_name = $2, email = $3, password = $4, dob = $5, address = $6, city = $7, postal_code = $8, country = $9, profile_image = $10
      WHERE user_id = $11
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [username, full_name, email, password, dob, address, city, postal_code, country, profile_image, id]);
    return rows[0];
  }

  // Удалить пользователя по ID
  static async deleteUser(id) {
    const query = 'DELETE FROM public."Users" WHERE user_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = UsersModel;
