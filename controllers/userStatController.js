const UserStatsModel = require('../models/UserStatModel');
const pool = require('../db/connection'); 

// Получить всю статистику пользователей
exports.getAllUserStats = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."userstats"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить статистику пользователя по ID
exports.getUserStatById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."userstats" WHERE stats_id = $1', [id]);
    const stat = rows[0];

    if (!stat) {
      return res.status(404).json({ message: 'User stat not found' });
    }

    res.status(200).json(stat);
  } catch (error) {
    next(error);
  }
};

// Создать новую статистику пользователя
exports.createUserStat = async (req, res, next) => {
  const { user_id, tasks, friends_count, done_projects } = req.body;

  try {
    const query = `
      INSERT INTO public."userstats" (user_id, tasks, friends_count, done_projects)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks, friends_count, done_projects]);
    const newStat = rows[0];

    res.status(201).json(newStat);
  } catch (error) {
    next(error);
  }
};

// Обновить статистику пользователя по ID
exports.updateUserStat = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, tasks, friends_count, done_projects } = req.body;

  try {
    const query = `
      UPDATE public."userstats"
      SET user_id = $1, tasks = $2, friends_count = $3, done_projects = $4
      WHERE stats_id = $5
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks, friends_count, done_projects, id]);
    const updatedStat = rows[0];

    if (!updatedStat) {
      return res.status(404).json({ message: 'User stat not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

// Удалить статистику пользователя по ID
exports.deleteUserStat = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."userstats" WHERE stats_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedStat = rows[0];

    if (!deletedStat) {
      return res.status(404).json({ message: 'User stat not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
