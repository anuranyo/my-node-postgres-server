const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { getAllLinks, getLinkById, createLink, updateLink, deleteLink, getInfoForView } = require('../controllers/linkController');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask, getAllTasksByUserIdAndProjectId, getTasksSortedByDeadline, getTasksSortedByStatus, getAllTasksByID, getAllTasksByUserId, getTasksByProjectId } = require('../controllers/TasksController');
const { getAllJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/JobsController');
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject, getProjectsSortedByDate, getProjectsSortedByName, getAllActiveProjectsByUserId } = require('../controllers/activeProjectController');
const { getAllRequests, getRequestById, createRequest, updateRequest, deleteRequest, getAllRequestsByUserId } = require('../controllers/requestController');
const { getAllUserContactInfos, getUserContactInfoById, createUserContactInfo, updateUserContactInfo, deleteUserContactInfo, getAllUserContactInfosByUserId  } = require('../controllers/userContactInfoController');
const { getAllColleagues, getColleagueById, createColleague, updateColleague, deleteColleague, getColleaguesByUserId, getColleaguesByProjectId } = require('../controllers/colleaguesController');
const { getAllUserStats, getUserStatById, createUserStat, updateUserStat, deleteUserStat, getStatsByUserId } = require('../controllers/userStatController');
const { getAllUserTaskSummaries, getUserTaskSummaryById, createUserTaskSummary, updateUserTaskSummary, deleteUserTaskSummary, getAllUserTaskSummariesByUserId } = require('../controllers/userTaskSummaryController');
const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../controllers/tagsController');
const { getAllSettings, getSettingById, createSetting, updateSetting, deleteSetting, getAllSettingsByUserId } = require('../controllers/SettingsController');
const { register, login, authenticateToken, } = require('../controllers/AuthController');
const authRoutes = require('./AuthRoutes');
const { getAllUserTags, getUserTagById, createUserTag, updateUserTag, deleteUserTag, getAllUserTagsByUserId } = require('../controllers/userTagController');
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, } = require('../controllers/blogController');
const { getAllReports, getReportById, createReport, updateReport, deleteReport, getAllReportsByUserId } = require('../controllers/reportControllers');

const router = express.Router();

// USERS ROUTES
router.get('/getAllUsers', getAllUsers); 
router.get('/getUserById/:id', getUserById);
router.post('/createUser/', createUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);


// TASKS ROUTES
router.get('/getAllTasks/', getAllTasks);
router.get('/getTaskById/:id', getTaskById);
router.post('/createTask/', createTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);
router.get('/getTasksSortedByDeadline/', getTasksSortedByDeadline);
router.get('/getTasksSortedByStatus/', getTasksSortedByStatus);
router.get('/getAllTasksByID/:userId', getAllTasksByID);
router.get('/getAllTasksByUserId/:userId', getAllTasksByUserId);
router.get('/getTasksByProjectId/:projectId', getTasksByProjectId);
router.get('/getAllTasksByUserIdAndProjectId/:userId/:projectId', getAllTasksByUserIdAndProjectId);

// LINK ROUTES
router.get('/getAllLinks', getAllLinks);
router.get('/getLinkById/:id', getLinkById);
router.post('/createLink', createLink);
router.put('/updateLink/:id', updateLink);
router.delete('/deleteLink/:id', deleteLink);
router.get('/getInfoForView/:jobId', getInfoForView);

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
router.get('/getProjectsSortedByDate', getProjectsSortedByDate);
router.get('/getProjectsSortedByName', getProjectsSortedByName);
router.get('/getAllActiveProjectsByUserId/:userId', getAllActiveProjectsByUserId);

//REQUEST ROUTES
router.get('/getAllRequests', getAllRequests);
router.get('/getRequestById/:id', getRequestById);
router.post('/createRequest/', createRequest);
router.put('/updateRequest/:id', updateRequest);
router.delete('/deleteRequest/:id', deleteRequest);
router.get('/getAllRequestsByUserId/:userId', getAllRequestsByUserId);


//USER CONTACT INFO ROUTES
router.get('/getAllUserContactInfos', getAllUserContactInfos);
router.get('/getUserContactInfoById/:id', getUserContactInfoById);
router.post('/createUserContactInfo/', createUserContactInfo);
router.put('/updateUserContactInfo/:id', updateUserContactInfo);
router.delete('/deleteUserContactInfo/:id', deleteUserContactInfo);
router.get('/getAllUserContactInfosByUserId/:userId', getAllUserContactInfosByUserId);

//COLLEAGUES ROUTES
router.get('/getAllColleagues', getAllColleagues);
router.get('/getColleagueById/:id', getColleagueById);
router.post('/createColleague/', createColleague);
router.put('/updateColleague/:id', updateColleague);
router.delete('/deleteColleague/:id', deleteColleague);
router.get('/getColleaguesByUserId/:userId', getColleaguesByUserId);
router.get('/getColleaguesByProjectId/:projectId', getColleaguesByProjectId);

//USER STAT ROUTES
router.get('/getAllUserStats', getAllUserStats);
router.get('/getUserStatById/:id', getUserStatById);
router.post('/createUserStat/', createUserStat);
router.put('/updateUserStat/:id', updateUserStat);
router.delete('/deleteUserStat/:id', deleteUserStat);
router.get('/getStatsByUserId/:userId', getStatsByUserId);

//USER TASK SUMMARY ROUTES
router.get('/getAllUserTaskSummaries', getAllUserTaskSummaries);
router.get('/getUserTaskSummaryById/:id', getUserTaskSummaryById);
router.post('/createUserTaskSummary/', createUserTaskSummary);
router.put('/updateUserTaskSummary/:id', updateUserTaskSummary);
router.delete('/deleteUserTaskSummary/:id', deleteUserTaskSummary);
router.get('/getAllUserTaskSummariesByUserId/:userId', getAllUserTaskSummariesByUserId);


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
router.get('/getAllSettingsByUserId/:userId', getAllSettingsByUserId);


// USER TAGS ROUTES
router.get('/getAllUserTags/', getAllUserTags);
router.get('/getUserTagById/:id', getUserTagById);
router.post('/createUserTag/', createUserTag);
router.put('/updateUserTag/:id', updateUserTag);
router.delete('/deleteUserTag/:id', deleteUserTag);
router.get('/getAllUserTagsByUserId/:userId', getAllUserTagsByUserId);


//BLOG ROUTES
router.get('/getAllBlogs/', getAllBlogs);
router.get('/getBlogById/:id', getBlogById);
router.post('/createBlog/', createBlog);
router.put('/updateBlog/:id', updateBlog);
router.delete('/deleteBlog/:id', deleteBlog);

// REPORTS ROUTES
router.get('/getAllReports', getAllReports);
router.get('/getReportById/:id', getReportById);
router.post('/createReport', createReport);
router.put('/updateReport/:id', updateReport);
router.delete('/deleteReport/:id', deleteReport);
router.get('/getAllReportsByUserId/:userId', getAllReportsByUserId);

//AUTH +
router.use('/auth', authRoutes);

module.exports = router;