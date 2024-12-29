const pool = require('../db/connection');

class ReportsModel {
  // Получить все отчеты
  static async getAllReports() {
    const query = 'SELECT * FROM public.reports';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить отчет по ID
  static async getReportById(reportId) {
    const query = 'SELECT * FROM public.reports WHERE report_id = $1';
    const { rows } = await pool.query(query, [reportId]);
    return rows[0];
  }

  // Создать новый отчет
  static async createReport({ user_id, message_text }) {
    const query = `
      INSERT INTO public.reports (user_id, message_text)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, message_text]);
    return rows[0];
  }

  // Обновить отчет по ID
  static async updateReport(reportId, { user_id, message_text }) {
    const query = `
      UPDATE public.reports
      SET user_id = $1, message_text = $2
      WHERE report_id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, message_text, reportId]);
    return rows[0];
  }

  // Удалить отчет по ID
  static async deleteReport(reportId) {
    const query = 'DELETE FROM public.reports WHERE report_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [reportId]);
    return rows[0];
  }

  // Получить все отчеты по user_id
  static async getAllReportsByUserId(userId) {
    const query = 'SELECT * FROM public.reports WHERE user_id = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
}

module.exports = ReportsModel;
