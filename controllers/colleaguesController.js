const ColleagueModel = require('../models/colleaguesModel');
const pool = require('../db/connection');

// Получить всех коллег
exports.getAllColleagues = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."colleagues"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить коллегу по ID
exports.getColleagueById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."colleagues" WHERE colleague_id = $1', [id]);
    const colleague = rows[0];

    if (!colleague) {
      return res.status(404).json({ message: 'Colleague not found' });
    }

    res.status(200).json(colleague);
  } catch (error) {
    next(error);
  }
};

// Создать нового коллегу
exports.createColleague = async (req, res, next) => {
  const { user_id, name, project_name } = req.body;

  try {
    const query = `
      INSERT INTO public."colleagues" (user_id, name, project_name)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, project_name]);
    const newColleague = rows[0];

    res.status(201).json(newColleague);
  } catch (error) {
    next(error);
  }
};

// Обновить коллегу по ID
exports.updateColleague = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, name, project_name } = req.body;

  try {
    const query = `
      UPDATE public."colleagues"
      SET user_id = $1, name = $2, project_name = $3
      WHERE colleague_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, project_name, id]);
    const updatedColleague = rows[0];

    if (!updatedColleague) {
      return res.status(404).json({ message: 'Colleague not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

// Удалить коллегу по ID
exports.deleteColleague = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."colleagues" WHERE colleague_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedColleague = rows[0];

    if (!deletedColleague) {
      return res.status(404).json({ message: 'Colleague not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

// Получить всех коллег по user_id
exports.getColleaguesByUserId = async (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const colleagues = await ColleagueModel.getColleaguesByUserId(userId);

    if (colleagues.length === 0) {
      return res.status(404).json({ message: 'No colleagues found for this user' });
    }

    res.status(200).json(colleagues);
  } catch (error) {
    next(error);
  }
};

// Получить всех коллег по project_id
exports.getColleaguesByProjectId = async (req, res, next) => {
  const projectId = req.params.projectId;

  if (!projectId) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  try {
    const colleagues = await ColleagueModel.getColleaguesByProjectId(projectId);

    if (colleagues.length === 0) {
      return res.status(404).json({ message: 'No colleagues found for this project' });
    }

    res.status(200).json(colleagues);
  } catch (error) {
    next(error);
  }
};
