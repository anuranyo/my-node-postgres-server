const UserTagModel = require('../models/UserTagModel');
const pool = require('../db/connection'); 

// Получить все связи тегов с пользователями
exports.getAllUserTags = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."usertags"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить связь тегов с пользователем по ID
exports.getUserTagById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."usertags" WHERE user_tag_id = $1', [id]);
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
      INSERT INTO public."usertags" (user_id, tag_id)
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
      UPDATE public."usertags"
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
    const query = 'DELETE FROM public."usertags" WHERE user_tag_id = $1 RETURNING *;';
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

exports.getAllUserTagsByUserId = async (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const userTags = await UserTagModel.getAllUserTagsByUserId(userId);

    if (!userTags || userTags.length === 0) {
      return res.status(404).json({ message: 'No tags found for this user' });
    }

    res.status(200).json(userTags);
  } catch (error) {
    next(error);
  }
};
