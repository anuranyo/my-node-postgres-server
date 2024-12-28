const SettingsModel = require('../models/SettingsModel');
const pool = require('../db/connection'); 

// Получить все настройки
exports.getAllSettings = async (req, res, next) => {
  try {
    const settings = await SettingsModel.getAllSettings();
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

// Получить настройку по ID
exports.getSettingById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const setting = await SettingsModel.getSettingById(id);
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.status(200).json(setting);
  } catch (error) {
    next(error);
  }
};

// Создать новую настройку
exports.createSetting = async (req, res, next) => {
  const { user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth } = req.body;
  try {
    const newSetting = await SettingsModel.createSetting({ user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth });
    res.status(201).json(newSetting);
  } catch (error) {
    next(error);
  }
};

// Обновить настройку по ID
exports.updateSetting = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth } = req.body;
  try {
    const updatedSetting = await SettingsModel.updateSetting(id, { user_id, is_verified, submit_review, get_task, recommendations, two_factor_auth });
    if (!updatedSetting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.status(200).json(updatedSetting);
  } catch (error) {
    next(error);
  }
};

// Удалить настройку по ID
exports.deleteSetting = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedSetting = await SettingsModel.deleteSetting(id);
    if (!deletedSetting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
