const TagModel = require('../models/tagModel');
const pool = require('../db/connection'); 

// Получить все теги
exports.getAllTags = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."Tags"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить тег по ID
exports.getTagById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."Tags" WHERE tag_id = $1', [id]);
    const tag = rows[0];

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

// Создать новый тег
exports.createTag = async (req, res, next) => {
  const { tag_name } = req.body;

  try {
    const query = `
      INSERT INTO public."Tags" (tag_name)
      VALUES ($1)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [tag_name]);
    const newTag = rows[0];

    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

// Обновить тег по ID
exports.updateTag = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { tag_name } = req.body;

  try {
    const query = `
      UPDATE public."Tags"
      SET tag_name = $1
      WHERE tag_id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [tag_name, id]);
    const updatedTag = rows[0];

    if (!updatedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

// Удалить тег по ID
exports.deleteTag = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."Tags" WHERE tag_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedTag = rows[0];

    if (!deletedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
