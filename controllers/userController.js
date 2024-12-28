const userModel = require('../models/userModel');
const pool = require('../db/connection'); 


exports.getAllUsers = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."Users"');
    res.status(200).json(rows);
  } catch (error) {
    next(error); 
  }
};

exports.getUserById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { rows } = await pool.query('SELECT * FROM public."Users" WHERE user_id = $1', [id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error); 
  }
};

exports.createUser = async (req, res, next) => {
  const { username, full_name, email, password, dob, address, city, postal_code, country, profile_image } = req.body;

  try {
    const query = `
      INSERT INTO public."Users" (username, full_name, email, password, dob, address, city, postal_code, country, profile_image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [username, full_name, email, password, dob, address, city, postal_code, country, profile_image]);
    const newUser = rows[0];

    res.status(201).json(newUser);
  } catch (error) {
    next(error); 
  }
};

exports.updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { username, full_name, email, password, dob, address, city, postal_code, country, profile_image } = req.body;

  try {
    const query = `
      UPDATE public."Users"
      SET username = $1, full_name = $2, email = $3, password = $4, dob = $5, address = $6, city = $7, postal_code = $8, country = $9, profile_image = $10
      WHERE user_id = $11
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [username, full_name, email, password, dob, address, city, postal_code, country, profile_image, id]);
    const updatedUser = rows[0];

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error); 
  }
};


exports.deleteUser = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const query = 'DELETE FROM public."Users" WHERE user_id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    const deletedUser = rows[0];

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send(); 
  } catch (error) {
    next(error); 
  }
};