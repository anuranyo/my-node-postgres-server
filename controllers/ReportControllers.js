const ReportsModel = require('../models/ReportsModel');

// Получить все отчеты
exports.getAllReports = async (req, res, next) => {
  try {
    const reports = await ReportsModel.getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

// Получить отчет по ID
exports.getReportById = async (req, res, next) => {
  const reportId = parseInt(req.params.id, 10);

  if (isNaN(reportId)) {
    return res.status(400).json({ message: 'Invalid report ID' });
  }

  try {
    const report = await ReportsModel.getReportById(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

// Создать новый отчет
exports.createReport = async (req, res, next) => {
  const { user_id, message_text } = req.body;

  try {
    const newReport = await ReportsModel.createReport({ user_id, message_text });
    res.status(201).json(newReport);
  } catch (error) {
    next(error);
  }
};

// Обновить отчет по ID
exports.updateReport = async (req, res, next) => {
  const reportId = parseInt(req.params.id, 10);
  const { user_id, message_text } = req.body;

  if (isNaN(reportId)) {
    return res.status(400).json({ message: 'Invalid report ID' });
  }

  try {
    const updatedReport = await ReportsModel.updateReport(reportId, { user_id, message_text });

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    next(error);
  }
};

// Удалить отчет по ID
exports.deleteReport = async (req, res, next) => {
  const reportId = parseInt(req.params.id, 10);

  if (isNaN(reportId)) {
    return res.status(400).json({ message: 'Invalid report ID' });
  }

  try {
    const deletedReport = await ReportsModel.deleteReport(reportId);

    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Получить все отчеты по user_id
exports.getAllReportsByUserId = async (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const reports = await ReportsModel.getAllReportsByUserId(userId);

    if (reports.length === 0) { return res.status(404).json({ message: 'No reports found for this user' }); }

    res.status(200).json(reports); } catch (error) { next(error); } };
