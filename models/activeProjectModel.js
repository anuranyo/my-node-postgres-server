const pool = require('../db/connection');

// Получить все проекты
exports.getAllProjects = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."ActiveProjects"');
    res.status(200).json(rows);
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};

// Получить проект по ID
exports.getProjectById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."ActiveProjects" WHERE project_id = $1', [id]);
    const project = rows[0];

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};

// Создать новый проект
exports.createProject = async (req, res, next) => {
  const { user_id, name, members_count, join_date, progress, deadline, description } = req.body;

  try {
    const query = `
      INSERT INTO public."ActiveProjects" (user_id, name, members_count, join_date, progress, deadline, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, members_count, join_date, progress, deadline, description]);
    const newProject = rows[0];

    res.status(201).json(newProject);
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};

// Обновить проект по ID
exports.updateProject = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, name, members_count, join_date, progress, deadline, description } = req.body;

  try {
    const query = `
      UPDATE public."ActiveProjects"
      SET user_id = $1, name = $2, members_count = $3, join_date = $4, progress = $5, deadline = $6, description = $7
      WHERE project_id = $8
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, members_count, join_date, progress, deadline, description, id]);
    const updatedProject = rows[0];

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};

// Удалить проект по ID
exports.deleteProject = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."ActiveProjects" WHERE project_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedProject = rows[0];

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};
