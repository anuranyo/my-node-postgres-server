const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const ngrok = require('ngrok');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const pool = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Настройка CSP для поддержки blob и стилей
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

// Use /api for all routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Функция для запуска сервера и настройки Ngrok
const startServer = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Успешное подключение к базе данных');

    app.listen(PORT, async () => {
      console.log(`✅ Сервер успешно запущен на http://localhost:${PORT}`);

      const ngrokUrl = await ngrok.connect(PORT);
      console.log(`🌐 Ngrok запущен: ${ngrokUrl}`);
    });
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных или серверу:', error.message);
    process.exit(1);
  }
};

// Запуск сервера
startServer();
