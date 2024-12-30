const pool = require('../db/connection');

class ColleaguesModel {
  // Получить всех коллег
  static async getAllColleagues() {
    const query = 'SELECT * FROM public."colleagues"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить коллегу по ID
  static async getColleagueById(id) {
    const query = 'SELECT * FROM public."colleagues" WHERE colleague_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать нового коллегу
  static async createColleague({ user_id, name, project_name }) {
    const query = `
      INSERT INTO public."colleagues" (user_id, name, project_name)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, project_name]);
    return rows[0];
  }

  // Обновить коллегу по ID
  static async updateColleague(id, { user_id, name, project_name }) {
    const query = `
      UPDATE public."colleagues"
      SET user_id = $1, name = $2, project_name = $3
      WHERE colleague_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, project_name, id]);
    return rows[0];
  }

  // Удалить коллегу по ID
  static async deleteColleague(id) {
    const query = 'DELETE FROM public."colleagues" WHERE colleague_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Получить всех коллег по user_id
static async getColleaguesByUserId(userId) {
  const query = `
    SELECT *
    FROM public."colleagues"
    WHERE user_id = $1;
  `;
  try {
    const { rows } = await pool.query(query, [userId]); // Параметризованный запрос
    return rows; // Возвращаем массив коллег
  } catch (error) {
    console.error('Error fetching colleagues by user ID:', error);
    throw error;
  }
}

// Получить всех коллег по project_id
static async getColleaguesByProjectId(projectId) {
  const query = `
    SELECT *
    FROM public."colleagues"
    WHERE project_id = $1;
  `;
  try {
    const { rows } = await pool.query(query, [projectId]); // Параметризованный запрос
    return rows; // Возвращаем массив коллег
  } catch (error) {
    console.error('Error fetching colleagues by project ID:', error);
    throw error;
  }
}

}

module.exports = ColleaguesModel;
