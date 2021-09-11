const { request, response } = require('express');
const express = require('express');
const pool = require('../helpers/database');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/:id', async function (req, res) {
  try {
    const sqlQuery =
      'SELECT id, email, password, created_at FROM user WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post('/register', async function (req, res) {
  try {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const sqlQuery = 'INSERT INTO user (email,password) value (?,?)';
    const result = await pool.query(sqlQuery, [email, encryptedPassword]);

    res.status(200).json({ userId: result.insertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;
    const sqlQuery = 'SELECT password FROM user WHERE email=?';
    const rows = await pool.query(sqlQuery, email);
    if (rows) {
      isValid = await bcrypt.compare(password, rows[0].password);
      res.status(200).json({ isvalid: isValid });
    } else {
      res.status(404).send(`User with email ${email} was not found`);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});
module.exports = router;
