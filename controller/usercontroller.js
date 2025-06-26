const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const trans = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const [dup] = await pool.query('SELECT id FROM UserTable WHERE email=?', [email]);
  if (dup.length) return res.status(409).json({ msg: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO UserTable (firstName,lastName,email,password) VALUES (?,?,?,?)',
    [firstName, lastName, email, hash]
  );
  res.json({ msg: 'Sign-up ok' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [[user]] = await pool.query('SELECT * FROM UserTable WHERE email=?', [email]);
  if (!user) return res.status(400).json({ msg: 'Bad creds' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: 'Bad creds' });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.forgot = async (req, res) => {
  const { email } = req.body;
  const [[user]] = await pool.query('SELECT * FROM UserTable WHERE email=?', [email]);
  if (!user) return res.json({ msg: 'If email exists we sent link' });
  const raw = crypto.randomBytes(32).toString('hex');
  const token = crypto.createHash('sha256').update(raw).digest('hex');
  const expire = new Date(Date.now() + 5 * 60 * 1000);
  await pool.query('UPDATE UserTable SET resetToken=?, resetExpires=? WHERE id=?', [
    token,
    expire,
    user.id
  ]);
  const link = `${process.env.FRONT_URL}/reset-password/${raw}`;
  await trans.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'Reset password',
    html: `<p>Reset link valid 5 min: <a href="${link}">${link}</a></p>`
  });
  res.json({ msg: 'Mail sent' });
};

exports.reset = async (req, res) => {
  const raw = req.params.token;
  const hashed = crypto.createHash('sha256').update(raw).digest('hex');
  const [[user]] = await pool.query(
    'SELECT * FROM UserTable WHERE resetToken=? AND resetExpires > NOW()',
    [hashed]
  );
  if (!user) return res.status(400).json({ msg: 'Bad or expired link' });
  const hash = await bcrypt.hash(req.body.password, 10);
  await pool.query(
    'UPDATE UserTable SET password=?, resetToken=NULL, resetExpires=NULL WHERE id=?',
    [hash, user.id]
  );
  res.json({ msg: 'Password changed' });
};
