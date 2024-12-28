const RequestsModel = require('../models/requestsModel');

exports.getAllRequests = async (req, res, next) => {
  try {
    const requests = await RequestsModel.getAllRequests();
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

exports.getRequestById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const request = await RequestsModel.getRequestById(id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

exports.createRequest = async (req, res, next) => {
  const { user_id, project_name, status } = req.body;

  try {
    const newRequest = await RequestsModel.createRequest({ user_id, project_name, status });
    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};

exports.updateRequest = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, project_name, status } = req.body;

  try {
    const updatedRequest = await RequestsModel.updateRequest(id, { user_id, project_name, status });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

exports.deleteRequest = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const deletedRequest = await RequestsModel.deleteRequest(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
