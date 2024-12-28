const pool = require('../db/connection');

class LinksModel {
  // Получить все ссылки
  static async getAllLinks() {
    const query = 'SELECT * FROM public."links"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить ссылку по ID
  static async getLinkById(id) {
    const query = 'SELECT * FROM public."links" WHERE link_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую ссылку
  static async createLink({ user_id, name, icon, url }) {
    const query = `
      INSERT INTO public."links" (user_id, name, icon, url)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, icon, url]);
    return rows[0];
  }

  // Обновить ссылку по ID
  static async updateLink(id, { user_id, name, icon, url }) {
    const query = `
      UPDATE public."links"
      SET user_id = $1, name = $2, icon = $3, url = $4
      WHERE link_id = $5
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, icon, url, id]);
    return rows[0];
  }

  // Удалить ссылку по ID
  static async deleteLink(id) {
    const query = 'DELETE FROM public."links" WHERE link_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = LinksModel;
