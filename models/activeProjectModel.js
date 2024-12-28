const pool = require('../db/connection');

class ActiveProjectsModel {
  // Получить все проекты
  static async getAllProjects() {
    const query = 'SELECT * FROM public."ActiveProjects"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить проект по ID
  static async getProjectById(id) {
    const query = 'SELECT * FROM public."ActiveProjects" WHERE project_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новый проект
  static async createProject({ user_id, name, members_count, join_date, progress, deadline, description }) {
    const query = `
      INSERT INTO public."ActiveProjects" (user_id, name, members_count, join_date, progress, deadline, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, members_count, join_date, progress, deadline, description]);
    return rows[0];
  }

  // Обновить проект по ID
  static async updateProject(id, { user_id, name, members_count, join_date, progress, deadline, description }) {
    const query = `
      UPDATE public."ActiveProjects"
      SET user_id = $1, name = $2, members_count = $3, join_date = $4, progress = $5, deadline = $6, description = $7
      WHERE project_id = $8
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, members_count, join_date, progress, deadline, description, id]);
    return rows[0];
  }

  // Удалить проект по ID
  static async deleteProject(id) {
    const query = 'DELETE FROM public."ActiveProjects" WHERE project_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = ActiveProjectsModel;
