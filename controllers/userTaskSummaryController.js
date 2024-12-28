const UserTaskSummaryModel = require('../models/UserTaskSummaryModel');

// Получить все сводки задач пользователей
exports.getAllUserTaskSummaries = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."UserTaskSummary"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить сводку задач пользователя по ID
exports.getUserTaskSummaryById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."UserTaskSummary" WHERE summary_id = $1', [id]);
    const summary = rows[0];

    if (!summary) {
      return res.status(404).json({ message: 'User task summary not found' });
    }

    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};

// Создать новую сводку задач пользователя
exports.createUserTaskSummary = async (req, res, next) => {
  const { user_id, tasks_completed, tasks_left } = req.body;

  try {
    const query = `
      INSERT INTO public."UserTaskSummary" (user_id, tasks_completed, tasks_left)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks_completed, tasks_left]);
    const newSummary = rows[0];

    res.status(201).json(newSummary);
  } catch (error) {
    next(error);
  }
};

// Обновить сводку задач пользователя по ID
exports.updateUserTaskSummary = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, tasks_completed, tasks_left } = req.body;

  try {
    const query = `
      UPDATE public."UserTaskSummary"
      SET user_id = $1, tasks_completed = $2, tasks_left = $3
      WHERE summary_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, tasks_completed, tasks_left, id]);
    const updatedSummary = rows[0];

    if (!updatedSummary) {
      return res.status(404).json({ message: 'User task summary not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

// Удалить сводку задач пользователя по ID
exports.deleteUserTaskSummary = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."UserTaskSummary" WHERE summary_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedSummary = rows[0];

    if (!deletedSummary) {
      return res.status(404).json({ message: 'User task summary not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
