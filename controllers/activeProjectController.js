const ActiveProjectsModel = require('../models/activeProjectModel');
const pool = require('../db/connection');

exports.getAllProjects = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."activeprojects"');
    res.status(200).json(rows);
  } catch (error) {
    next(error); 
  }
};

exports.getProjectById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."activeprojects" WHERE project_id = $1', [id]);
    const project = rows[0];

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error); 
  }
};

exports.createProject = async (req, res, next) => {
  const { userId, name, members_count, join_date, progress, deadline, description } = req.body;

  try {
    const query = `
      INSERT INTO public."activeprojects" (name, members_count, join_date, progress, deadline, description, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, members_count, join_date, progress, deadline, description, userId]);
    const newProject = rows[0];

    res.status(201).json(newProject);
  } catch (error) {
    next(error); 
  }
};

exports.updateProject = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { name, members_count, join_date, progress, deadline, description } = req.body;

  try {
    const query = `
      UPDATE public."activeprojects"
      SET name = $1, members_count = $2, join_date = $3, progress = $4, deadline = $5, description = $6
      WHERE project_id = $7
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, members_count, join_date, progress, deadline, description, id]);
    const updatedProject = rows[0];

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(204).send(); 
  } catch (error) {
    next(error); 
  }
};

exports.deleteProject = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."activeprojects" WHERE project_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedProject = rows[0];

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(204).send(); 
  } catch (error) {
    next(error); 
  }
};

exports.getProjectsSortedByDate = async (req, res, next) => {
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC';

  try {
    const query = `SELECT * FROM public."activeprojects" ORDER BY join_date ${order};`;
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

exports.getProjectsSortedByName = async (req, res, next) => {
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC';

  try {
    const query = `SELECT * FROM public."activeprojects" ORDER BY name ${order};`;
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить все активные проекты по user_id
exports.getAllActiveProjectsByUserId = async (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const projects = await ActiveProjectsModel.getAllActiveProjectsByUserId(userId);

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No active projects found for this user' });
    }

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};
