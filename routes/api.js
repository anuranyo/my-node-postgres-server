const express = require('express');
const { getAllProjects } = require('../controllers/projectController');
const { getAllUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

//USERS
router.get('/', getAllUsers);
router.get('/:id', getUserById);

//PROJECTS
router.get('/', getAllProjects);

module.exports = router;
