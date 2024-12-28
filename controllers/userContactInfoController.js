const UserContactInfoModel = require('../models/userContactInfoModel');

// Получить всю контактную информацию
exports.getAllUserContactInfos = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."UserContactInfo"');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Получить контактную информацию по ID
exports.getUserContactInfoById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."UserContactInfo" WHERE contact_id = $1', [id]);
    const contactInfo = rows[0];

    if (!contactInfo) {
      return res.status(404).json({ message: 'Contact info not found' });
    }

    res.status(200).json(contactInfo);
  } catch (error) {
    next(error);
  }
};

// Создать новую контактную информацию
exports.createUserContactInfo = async (req, res, next) => {
  const { user_id, email, phone, status } = req.body;

  try {
    const query = `
      INSERT INTO public."UserContactInfo" (user_id, email, phone, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, email, phone, status]);
    const newContactInfo = rows[0];

    res.status(201).json(newContactInfo);
  } catch (error) {
    next(error);
  }
};

// Обновить контактную информацию по ID
exports.updateUserContactInfo = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { user_id, email, phone, status } = req.body;

  try {
    const query = `
      UPDATE public."UserContactInfo"
      SET user_id = $1, email = $2, phone = $3, status = $4
      WHERE contact_id = $5
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, email, phone, status, id]);
    const updatedContactInfo = rows[0];

    if (!updatedContactInfo) {
      return res.status(404).json({ message: 'Contact info not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

// Удалить контактную информацию по ID
exports.deleteUserContactInfo = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."UserContactInfo" WHERE contact_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedContactInfo = rows[0];

    if (!deletedContactInfo) {
      return res.status(404).json({ message: 'Contact info not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
