const pool = require('../db/connection');

exports.getUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM Users');
  return rows;
};

exports.getUser = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM public."Users" WHERE user_id = $1`, [id]);
  return rows[0];
};
