const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors'); // Import the CORS middleware
const ngrok = require('ngrok');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const pool = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins; replace with specific origin(s) for better security
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

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

// Экспортируем `app` для тестов
module.exports = app;

// Запуск сервера только если файл запускается напрямую
if (require.main === module) {
  startServer();
}
