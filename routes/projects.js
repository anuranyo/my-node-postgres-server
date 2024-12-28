const express = require('express');
const { getAllProjects } = require('../controllers/projectController');

const router = express.Router();

router.get('/', getAllProjects);

module.exports = router;
