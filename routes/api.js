const express = require('express');
const { getAllUsers, getUserById, createProject, updateProject, deleteProject } = require('../controllers/userController');
const { getAllLinks, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/active_projects');

const router = express.Router();

// USERS ROUTES
router.get('/getAllUsers', getAllUsers); 
router.get('/getUserById/:id', getUserById);
router.post('/createProject/:id', createProject);
router.put('/updateProject/:id', updateProject);
router.delete('/deleteProject/:id', deleteProject);

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
router.get('/getAllLinks', getAllLinks);
router.get('/getProjectById/:id', getProjectById);
router.post('/createProject/', createProject);
router.put('/updateProject/:id', updateProject);
router.delete('/deleteProject/:id', deleteProject);

//REQUEST ROUTES
router.get('/getAllRequests', getAllRequests);
router.get('/getRequestById/:id', getRequestById);
router.post('/createRequest/', createRequest);
router.put('/updateRequest/:id', updateRequest);
router.delete('/deleteRequest/:id', deleteRequest);

//USER CONTACT INFO ROUTES
router.get('/getAllUserContactInfos', getAllUserContactInfos);
router.get('/getUserContactInfoById/:id', getUserContactInfoById);
router.post('/createUserContactInfo/', createUserContactInfo);
router.put('/updateUserContactInfo/:id', updateUserContactInfo);
router.delete('/deleteUserContactInfo/:id', deleteUserContactInfo);

//COLLEAGUES ROUTES
router.get('/getAllColleagues', getAllColleagues);
router.get('/getColleagueById/:id', getColleagueById);
router.post('/createColleague/', createColleague);
router.put('/updateColleague/:id', updateColleague);
router.delete('/deleteColleague/:id', deleteColleague);




module.exports = router;
