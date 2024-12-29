const pool = require('../db/connection');

class TagsModel {
  // Получить все теги
  static async getAllTags() {
    const query = 'SELECT * FROM public."tags"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить тег по ID
  static async getTagById(id) {
    const query = 'SELECT * FROM public."tags" WHERE tag_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Создать новый тег
  static async createTag({ tag_name }) {
    const query = `
      INSERT INTO public."tags" (tag_name)
      VALUES ($1)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [tag_name]);
    return rows[0];
  }

  // Обновить тег по ID
  static async updateTag(id, { tag_name }) {
    const query = `
      UPDATE public."tags"
      SET tag_name = $1
      WHERE tag_id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [tag_name, id]);
    return rows[0];
  }

  // Удалить тег по ID
  static async deleteTag(id) {
    const query = 'DELETE FROM public."tags" WHERE tag_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = TagsModel;
