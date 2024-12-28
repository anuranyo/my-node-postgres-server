const pool = require('../db/connection');

// Получить все ссылки
exports.getAllLinks = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."Links"');
    res.status(200).json(rows);
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};

// Получить ссылку по ID
exports.getLinkById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."Links" WHERE link_id = $1', [id]);
    const link = rows[0];

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.status(200).json(link);
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};

// Создать новую ссылку
exports.createLink = async (req, res, next) => {
  const { user_id, name, icon, url } = req.body;

  try {
    const query = `
      INSERT INTO public."Links" (user_id, name, icon, url)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, icon, url]);
    const newLink = rows[0];

    res.status(201).json(newLink);
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};

// Обновить ссылку по ID
exports.updateLink = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, name, icon, url } = req.body;

  try {
    const query = `
      UPDATE public."Links"
      SET user_id = $1, name = $2, icon = $3, url = $4
      WHERE link_id = $5
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, name, icon, url, id]);
    const updatedLink = rows[0];

    if (!updatedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};

// Удалить ссылку по ID
exports.deleteLink = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."Links" WHERE link_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedLink = rows[0];

    if (!deletedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error); // Передаём ошибку middleware
  }
};
