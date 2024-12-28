module.exports = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  // Проверка на ошибки валидации (например, из express-validator)
  if (err.errors) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map((error) => ({
        field: error.param,
        message: error.msg,
      })),
    });
  }

  // Проверка на ошибки базы данных (PostgreSQL)
  if (err.code === '23505') {
    // Ошибка уникальности (duplicate key)
    return res.status(409).json({
      error: 'Conflict',
      message: 'Duplicate entry detected.',
      detail: err.detail,
    });
  }

  if (err.code === '23503') {
    // Ошибка внешнего ключа (foreign key violation)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Foreign key constraint violation.',
      detail: err.detail,
    });
  }

  // Проверка на JWT ошибки
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token has expired.',
    });
  }

  // Обработка всех остальных ошибок
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong.',
  });
};
