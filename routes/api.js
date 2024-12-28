const express = require('express');
const { getAllUsers, getUserById, createProject, updateProject, deleteProject } = require('../controllers/userController');
const { getAllLinks, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/active_projects');
const { getAllSettings, getSettingById, createSetting, updateSetting, deleteSetting, } = require('../controllers/SettingsController');

const router = express.Router();

// USERS ROUTES
router.get('/users', getAllUsers); 
router.get('/users/:id', getUserById);
router.get('/users/:id', createProject);
router.get('/users/:id', updateProject);
router.get('/users/:id', deleteProject);

// TASKS ROUTES
router.get('/getAllTasks/', getAllTasks);
router.get('/getTaskById/:id', getTaskById);
router.post('/createTask/', createTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

// LINK ROUTES
router.get('/getAllLinks', getAllLinks);
router.get('/getLinkById/:id', getLinkById);
router.post('/createLink', createLink);
router.put('/updateLink/:id', updateLink);
router.delete('/deleteLink/:id', deleteLink);

// JOBS ROUTES
router.get('/getAllJobs/', getAllJobs);
router.get('/getJobById/:id', getJobById);
router.post('/createJob/', createJob);
router.put('/updateJob/:id', updateJob);
router.delete('/deleteJob/:id', deleteJob);

//ACTIVE PROJECT ROUTES
router.get('/active_projects', getAllLinks);
router.get('/active_projects/:id', getProjectById);
router.get('/active_projects/:create', createProject);
router.get('/active_projects/:update', updateProject);
router.get('/active_projects/:delete', deleteProject);

// SETTINGS ROUTES
router.get('/getAllSettings/', getAllSettings);
router.get('/getSettingById/:id', getSettingById);
router.post('/createSetting/', createSetting);
router.put('/updateSetting/:id', updateSetting);
router.delete('/deleteSetting/:id', deleteSetting);

// AUTH
const authRoutes = require('./routes/AuthRoutes');
router.use('/auth', authRoutes);

module.exports = router;
