const pool = require('../db/connection');

class BlogModel {
  // Получить все блоги
  static async getAllBlogs() {
    const query = 'SELECT * FROM public."blogs"';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Получить блог по ID
  static async getBlogById(id) {
    const query = 'SELECT * FROM public."blogs" WHERE blog_id = $1';
    const { rows } = await pool.query(query, [id]);
    const blog = rows[0];
    if (blog && blog.image) {
      blog.image = blog.image.toString('base64');
    }
    return blog;
  }

  // Создать новый блог
  static async createBlog({ image, title, description, author, date, avatar, favorite }) {
    const query = `
      INSERT INTO public."blogs" (image, title, description, author, date, avatar, favorite)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [    image ? Buffer.from(image, 'base64') : null, title, description, author, date, avatar, favorite]);
    return rows[0];
  }

  // Обновить блог по ID
  static async updateBlog(id, { image, title, description, author, date, avatar, favorite }) {
    const query = `
      UPDATE public."blogs"
      SET image = $1, title = $2, description = $3, author = $4, date = $5, avatar = $6, favorite = $7
      WHERE blog_id = $8
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [image, title, description, author, date, avatar, favorite, id]);
    return rows[0];
  }

  // Удалить блог по ID
  static async deleteBlog(id) {
    const query = 'DELETE FROM public."blogs" WHERE blog_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = BlogModel;
