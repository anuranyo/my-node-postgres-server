const JobsModel = require('../models/JobsModel');

// Получить все вакансии
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await JobsModel.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// Получить вакансию по ID
exports.getJobById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const job = await JobsModel.getJobById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// Создать новую вакансию
exports.createJob = async (req, res, next) => {
  const { title, company, location, experience, type, description, posted_date, salary } = req.body;
  try {
    const newJob = await JobsModel.createJob({ title, company, location, experience, type, description, posted_date, salary });
    res.status(201).json(newJob);
  } catch (error) {
    next(error);
  }
};

// Обновить вакансию по ID
exports.updateJob = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { title, company, location, experience, type, description, posted_date, salary } = req.body;
  try {
    const updatedJob = await JobsModel.updateJob(id, { title, company, location, experience, type, description, posted_date, salary });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    next(error);
  }
};

// Удалить вакансию по ID
exports.deleteJob = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedJob = await JobsModel.deleteJob(id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
