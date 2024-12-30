const userModel = require('../models/userModel');
const pool = require('../db/connection');
const bcrypt = require('bcrypt'); // Для хеширования паролей

exports.getAllUsers = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."Users"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."Users" WHERE user_id = $1', [id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.profile_image) {
      user.profile_image = user.profile_image.toString('base64');
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Создать нового пользователя
exports.createUser = async (req, res, next) => {
  const { username, full_name, email, password, dob, address, city, postal_code, country } = req.body;

  try {
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO public."Users" (username, full_name, email, password, dob, address, city, postal_code, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [username, full_name, email, hashedPassword, dob, address, city, postal_code, country];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// Обновить пользователя
exports.updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { username, full_name, email, password, dob, address, city, postal_code, country } = req.body;

  try {
    let hashedPassword = null;

    if (password) {
      // Хеширование нового пароля, если он указан
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const query = `
      UPDATE public."Users"
      SET username = $1, full_name = $2, email = $3, password = COALESCE($4, password),
          dob = $5, address = $6, city = $7, postal_code = $8, country = $9
      WHERE user_id = $10
      RETURNING *;
    `;
    const values = [username, full_name, email, hashedPassword, dob, address, city, postal_code, country, id];
    const { rows } = await pool.query(query, values);

    if (!rows[0]) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."Users" WHERE user_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedUser = rows[0];

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
