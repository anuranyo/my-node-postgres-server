const UserTagModel = require('../models/UserTagModel');
const pool = require('../db/connection'); 

// Получить все связи тегов с пользователями
exports.getAllUserTags = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."UserTags"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить связь тегов с пользователем по ID
exports.getUserTagById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."UserTags" WHERE user_tag_id = $1', [id]);
    const userTag = rows[0];

    if (!userTag) {
      return res.status(404).json({ message: 'User tag not found' });
    }

    res.status(200).json(userTag);
  } catch (error) {
    next(error);
  }
};

// Создать связь тегов с пользователем
exports.createUserTag = async (req, res, next) => {
  const { user_id, tag_id } = req.body;

  try {
    const query = `
      INSERT INTO public."UserTags" (user_id, tag_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tag_id]);
    const newUserTag = rows[0];

    res.status(201).json(newUserTag);
  } catch (error) {
    next(error);
  }
};

// Обновить связь тегов с пользователем по ID
exports.updateUserTag = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, tag_id } = req.body;

  try {
    const query = `
      UPDATE public."UserTags"
      SET user_id = $1, tag_id = $2
      WHERE user_tag_id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tag_id, id]);
    const updatedUserTag = rows[0];

    if (!updatedUserTag) {
      return res.status(404).json({ message: 'User tag not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

// Удалить связь тегов с пользователем по ID
exports.deleteUserTag = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."UserTags" WHERE user_tag_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedUserTag = rows[0];

    if (!deletedUserTag) {
      return res.status(404).json({ message: 'User tag not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
