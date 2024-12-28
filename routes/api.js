const express = require('express');
const { getAllProjects } = require('../controllers/projectController');
const { getAllUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

// USERS ROUTES
router.get('/users', getAllUsers); 
router.get('/users/:id', getUserById);
router.get('/users/:id', createProject);
router.get('/users/:id', updateProject);
router.get('/users/:id', deleteProject);


// PROJECTS ROUTES
router.get('/projects', getAllProjects);

module.exports = router;
