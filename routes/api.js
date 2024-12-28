const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { getAllLinks, getLinkById, createLink, updateLink, deleteLink } = require('../controllers/linkController');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/TasksController');
const { getAllJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/JobsController');
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/activeProjectController');
const { getAllRequests, getRequestById, createRequest, updateRequest, deleteRequest } = require('../controllers/requestController');
const { getAllUserContactInfos, getUserContactInfoById, createUserContactInfo, updateUserContactInfo, deleteUserContactInfo } = require('../controllers/userContactInfoController');
const { getAllColleagues, getColleagueById, createColleague, updateColleague, deleteColleague } = require('../controllers/colleaguesController');
const { getAllUserStats, getUserStatById, createUserStat, updateUserStat, deleteUserStat } = require('../controllers/userStatController');
const { getAllUserTaskSummaries, getUserTaskSummaryById, createUserTaskSummary, updateUserTaskSummary, deleteUserTaskSummary } = require('../controllers/userTaskSummaryController');
const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../controllers/tagsController');
const { getAllSettings, getSettingById, createSetting, updateSetting, deleteSetting, } = require('../controllers/SettingsController');
const { register, login, authenticateToken, } = require('../controllers/AuthController');
const authRoutes = require('./AuthRoutes');


const router = express.Router();

// USERS ROUTES
router.get('/getAllUsers', getAllUsers); 
router.get('/getUserById/:id', getUserById);
router.post('/createUser/:id', createUser);
router.put('/updateProject/:id', updateUser);
router.delete('/deleteProject/:id', deleteUser);

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
router.get('/getAllProjects', getAllProjects);
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

//USER STAT ROUTES
router.get('/getAllUserStats', getAllUserStats);
router.get('/getUserStatById/:id', getUserStatById);
router.post('/createUserStat/', createUserStat);
router.put('/updateUserStat/:id', updateUserStat);
router.delete('/deleteUserStat/:id', deleteUserStat);

//USER TASK SUMMARY ROUTES
router.get('/getAllUserTaskSummaries', getAllUserTaskSummaries);
router.get('/getUserTaskSummaryById/:id', getUserTaskSummaryById);
router.post('/createUserTaskSummary/', createUserTaskSummary);
router.put('/updateUserTaskSummary/:id', updateUserTaskSummary);
router.delete('/deleteUserTaskSummary/:id', deleteUserTaskSummary);

//TAGS ROUTES
router.get('/getAllTags', getAllTags);
router.get('/getTagById/:id', getTagById);
router.post('/createTag/', createTag);
router.put('/updateTag/:id', updateTag);
router.delete('/deleteTag/:id', deleteTag);

// SETTINGS ROUTES
router.get('/getAllSettings/', getAllSettings);
router.get('/getSettingById/:id', getSettingById);
router.post('/createSetting/', createSetting);
router.put('/updateSetting/:id', updateSetting);
router.delete('/deleteSetting/:id', deleteSetting);

//AUTH +
router.use('/auth', authRoutes);

module.exports = router;