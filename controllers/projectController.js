const { getProjects } = require('../models/projectModel');

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await getProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};
