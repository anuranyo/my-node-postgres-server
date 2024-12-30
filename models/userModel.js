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
  static async createUser({ username, full_name, email, password, dob, address, city, postal_code, country }) {
    const query = `
      INSERT INTO public."Users" (username, full_name, email, password, dob, address, city, postal_code, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [username, full_name, email, password, dob, address, city, postal_code, country];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Обновить пользователя
  static async updateUser(id, { username, full_name, email, password, dob, address, city, postal_code, country }) {
    const query = `
      UPDATE public."Users"
      SET username = $1, full_name = $2, email = $3, password = $4, dob = $5,
          address = $6, city = $7, postal_code = $8, country = $9
      WHERE user_id = $10
      RETURNING *;
    `;
    const values = [username, full_name, email, password, dob, address, city, postal_code, country, id];
    const { rows } = await pool.query(query, values);
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
