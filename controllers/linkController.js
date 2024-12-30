const LinksModel = require('../models/LinksModel');
const pool = require('../db/connection'); 

// Получить все ссылки
exports.getAllLinks = async (req, res, next) => {
  try {
    const links = await LinksModel.getAllLinks();
    res.status(200).json(links);
  } catch (error) {
    next(error);
  }
};

// Получить ссылку по ID
exports.getLinkById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const link = await LinksModel.getLinkById(id);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.status(200).json(link);
  } catch (error) {
    next(error);
  }
};

// Создать новую ссылку
exports.createLink = async (req, res, next) => {
  const { user_id, name, icon, url, job_id, full_description } = req.body;
  try {
    const newLink = await LinksModel.createLink({ user_id, name, icon, url, job_id, full_description });
    res.status(201).json(newLink);
  } catch (error) {
    next(error);
  }
};

// Обновить ссылку по ID
exports.updateLink = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, name, icon, url, job_id, full_description } = req.body;
  try {
    const updatedLink = await LinksModel.updateLink(id, { user_id, name, icon, url, job_id, full_description });
    if (!updatedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.status(200).json(updatedLink);
  } catch (error) {
    next(error);
  }
};

// Удалить ссылку по ID
exports.deleteLink = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedLink = await LinksModel.deleteLink(id);
    if (!deletedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
