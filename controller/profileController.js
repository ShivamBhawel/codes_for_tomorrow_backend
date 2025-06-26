const pool = require('../config/db');

exports.me = async (req, res) => {
  const [[user]] = await pool.query('SELECT id,firstName,lastName,email FROM UserTable WHERE id=?', [
    req.user.id
  ]);
  res.json(user);
};
