const express = require('express');
const { register, login, authenticateToken } = require('../controllers/AuthController');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('full_name').optional().isString().withMessage('Full name must be a string'),
    body('dob').optional().isISO8601().withMessage('Date of birth must be a valid date'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('city').optional().isString().withMessage('City must be a string'),
    body('postal_code').optional().isString().withMessage('Postal code must be a string'),
    body('country').optional().isString().withMessage('Country must be a string'),
    body('profile_image').optional().isString().withMessage('Profile image must be a string (Base64)')
  ],
  register
);


// Логин
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// Пример защищённого маршрута
router.get('/profile', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

module.exports = router;
