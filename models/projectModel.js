const pool = require('../db/connection');

exports.getProjects = async () => {
  const { rows } = await pool.query('SELECT * FROM ActiveProjects');
  return rows;
};
