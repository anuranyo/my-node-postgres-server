const ColleagueModel = require('../models/colleaguesModel');
const pool = require('../db/connection');

// Получить всех коллег
exports.getAllColleagues = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."Colleagues"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить коллегу по ID
exports.getColleagueById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."Colleagues" WHERE colleague_id = $1', [id]);
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
      INSERT INTO public."Colleagues" (user_id, name, project_name)
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
      UPDATE public."Colleagues"
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
    const query = 'DELETE FROM public."Colleagues" WHERE colleague_id = $1 RETURNING *;';
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
