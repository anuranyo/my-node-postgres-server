const pool = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Регистрация пользователя
exports.register = async (req, res, next) => {
  const { username, email, password, country, profile_image } = req.body;

  try {
    // Проверка, существует ли пользователь
    const existingUser = await pool.query('SELECT * FROM public."Users" WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const query = `
      INSERT INTO public."Users" (username, email, password, country, profile_image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id, username, email, country, profile_image;
    `;
    const values = [username, email, hashedPassword, country, profile_image];
    const { rows } = await pool.query(query, values);

    res.status(201).json({ message: 'User registered successfully.', user: rows[0] });
  } catch (error) {
    next(error);
  }
};

// Авторизация пользователя
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Проверка существования пользователя
    const query = 'SELECT * FROM public."Users" WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'No such user found.' });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password entered.' });
    }

    // Генерация JWT токена
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '2h', // Токен действует 2 часа
      }
    );

    // Данные пользователя
    const userData = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      profile_image: user.profile_image,
      country: user.country,
      token: token,
    };

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

// Middleware для проверки токена
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  });
};
