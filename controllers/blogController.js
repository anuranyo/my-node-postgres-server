const blogModel = require('../models/blogModel');
const pool = require('../db/connection');

// Получить все блоги
exports.getAllBlogs = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."blogs"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить блог по ID
exports.getBlogById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."blogs" WHERE blog_id = $1', [id]);
    const blog = rows[0];

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Декодируем изображение в Base64 для отправки на фронт
    if (blog.image) {
      blog.image = blog.image.toString('base64');
    }

    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  const { image, title, description, author, date, avatar, favorite } = req.body;

  try {
    const query = `
      INSERT INTO public."blogs" (image, title, description, author, date, avatar, favorite)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [
      image ? Buffer.from(image, 'base64') : null,
      title,
      description,
      author,
      date,
      avatar ? Buffer.from(avatar, 'base64') : null,
      favorite
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { image, title, description, author, date, avatar, favorite } = req.body;

  try {
    const query = `
      UPDATE public."blogs"
      SET image = $1, title = $2, description = $3, author = $4, date = $5, avatar = $6, favorite = $7
      WHERE blog_id = $8
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [
      image ? Buffer.from(image, 'base64') : null,
      title,
      description,
      author,
      date,
      avatar ? Buffer.from(avatar, 'base64') : null,
      favorite,
      id
    ]);

    if (!rows[0]) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// Удалить блог по ID
exports.deleteBlog = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."blogs" WHERE blog_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedBlog = rows[0];

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};