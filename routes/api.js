const express = require('express');
const { getAllUsers, getUserById, createProject, updateProject, deleteProject } = require('../controllers/userController');
const { getAllLinks, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/active_projects');

const router = express.Router();

// USERS ROUTES
router.get('/users', getAllUsers); 
router.get('/users/:id', getUserById);
router.get('/users/:id', createProject);
router.get('/users/:id', updateProject);
router.get('/users/:id', deleteProject);


//ACTIVE PROJECT ROUTES
router.get('/active_projects', getAllLinks);
router.get('/active_projects/:id', getProjectById);
router.get('/active_projects/:create', createProject);
router.get('/active_projects/:update', updateProject);
router.get('/active_projects/:delete', deleteProject);




module.exports = router;
