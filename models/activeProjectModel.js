const pool = require('../db/connection');

class ActiveProjectsModel {
  // Получить все проекты
  static async getAllProjects() {
    const query = 'SELECT * FROM public."activeprojects"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить проект по ID
  static async getProjectById(id) {
    const query = 'SELECT * FROM public."activeprojects" WHERE project_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новый проект
  static async createProject({name, members_count, join_date, progress, deadline, description }) {
    const query = `
      INSERT INTO public."activeprojects" (name, members_count, join_date, progress, deadline, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, members_count, join_date, progress, deadline, description]);
    return rows[0];
  }

  // Обновить проект по ID
  static async updateProject(id, { user_id, name, members_count, join_date, progress, deadline, description }) {
    const query = `
      UPDATE public."activeprojects"
      SET name = $1, members_count = $2, join_date = $3, progress = $4, deadline = $5, description = $6
      WHERE project_id = $7
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, members_count, join_date, progress, deadline, description, id]);
    return rows[0];
  }

  // Удалить проект по ID
  static async deleteProject(id) {
    const query = 'DELETE FROM public."activeprojects" WHERE project_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = ActiveProjectsModel;
