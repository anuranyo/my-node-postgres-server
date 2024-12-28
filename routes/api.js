const express = require('express');
const { getAllProjects } = require('../controllers/projectController');
const { getAllUsers, getUserById } = require('../controllers/userController');
const { getAllLinks, getLinkById, createLink, updateLink, deleteLink,  } = require('../controllers/linkController');
const {getAllTasks, getTaskById, createTask, updateTask, deleteTask,} = require('../controllers/TasksController');
const {getAllJobs, getJobById, createJob, updateJob, deleteJob,} = require('../controllers/JobsController');

const router = express.Router();

// USERS ROUTES
router.get('/users', getAllUsers); 
router.get('/users/:id', getUserById);

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


module.exports = router;
