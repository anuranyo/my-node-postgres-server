const express = require('express');
const { getAllProjects } = require('../controllers/projectController');
const { getAllUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

// USERS ROUTES
router.get('/users', getAllUsers); 
router.get('/users/:id', getUserById);

// PROJECTS ROUTES
router.get('/projects', getAllProjects);

module.exports = router;
