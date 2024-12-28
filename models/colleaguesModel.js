const pool = require('../db/connection');

class ColleaguesModel {
  // Получить всех коллег
  static async getAllColleagues() {
    const query = 'SELECT * FROM public."Colleagues"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить коллегу по ID
  static async getColleagueById(id) {
    const query = 'SELECT * FROM public."Colleagues" WHERE colleague_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать нового коллегу
  static async createColleague({ user_id, name, project_name }) {
    const query = `
      INSERT INTO public."Colleagues" (user_id, name, project_name)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, project_name]);
    return rows[0];
  }

  // Обновить коллегу по ID
  static async updateColleague(id, { user_id, name, project_name }) {
    const query = `
      UPDATE public."Colleagues"
      SET user_id = $1, name = $2, project_name = $3
      WHERE colleague_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, project_name, id]);
    return rows[0];
  }

  // Удалить коллегу по ID
  static async deleteColleague(id) {
    const query = 'DELETE FROM public."Colleagues" WHERE colleague_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = ColleaguesModel;
