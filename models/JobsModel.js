const pool = require('../db/connection');

class JobsModel {
  // Получить все вакансии
  static async getAllJobs() {
    const query = 'SELECT * FROM public."jobs"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить вакансию по ID
  static async getJobById(id) {
    const query = 'SELECT * FROM public."jobs" WHERE job_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новую вакансию
  static async createJob({ title, company, location, experience, type, description, posted_date, salary }) {
    const query = `
      INSERT INTO public."jobs" (title, company, location, experience, type, description, posted_date, salary)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [title, company, location, experience, type, description, posted_date, salary]);
    return rows[0];
  }

  // Обновить вакансию по ID
  static async updateJob(id, { title, company, location, experience, type, description, posted_date, salary }) {
    const query = `
      UPDATE public."jobs"
      SET title = $1, company = $2, location = $3, experience = $4, type = $5, description = $6, posted_date = $7, salary = $8
      WHERE job_id = $9
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [title, company, location, experience, type, description, posted_date, salary, id]);
    return rows[0];
  }

  // Удалить вакансию по ID
  static async deleteJob(id) {
    const query = 'DELETE FROM public."jobs" WHERE job_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = JobsModel;
