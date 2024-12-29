const pool = require('../db/connection');

class RequestsModel {
  // Получить все запросы
  static async getAllRequests() {
    const query = 'SELECT * FROM public."requests"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить запрос по ID
  static async getRequestById(id) {
    const query = 'SELECT * FROM public."requests" WHERE request_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новый запрос
  static async createRequest({ user_id, project_name, status }) {
    const query = `
      INSERT INTO public."requests" (user_id, project_name, status)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, project_name, status]);
    return rows[0];
  }

  // Обновить запрос по ID
  static async updateRequest(id, { user_id, project_name, status }) {
    const query = `
      UPDATE public."requests"
      SET user_id = $1, project_name = $2, status = $3
      WHERE request_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, project_name, status, id]);
    return rows[0];
  }

  // Удалить запрос по ID
  static async deleteRequest(id) {
    const query = 'DELETE FROM public."requests" WHERE request_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = RequestsModel;
