const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const ngrok = require('ngrok');
require('dotenv').config();

const userRoutes = require('./routes/api');
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



app.use('/users', userRoutes);
app.use('/projects', projectRoutes);



// Error handling middleware
app.use(errorHandler);

// Функция для запуска сервера и настройки Ngrok
const startServer = async () => {
  try {
    // Проверяем подключение к базе данных
    await pool.query('SELECT 1');
    console.log('✅ Успешное подключение к базе данных');

    // Запускаем сервер
    app.listen(PORT, async () => {
      console.log(`✅ Сервер успешно запущен на http://localhost:${PORT}`);

      // Подключаем Ngrok
      const ngrokUrl = await ngrok.connect(PORT);
      console.log(`🌐 Ngrok запущен: ${ngrokUrl}`);
    });
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных или серверу:', error.message);
    process.exit(1); // Завершаем процесс при ошибке
  }
};

// Запуск сервера
startServer();
