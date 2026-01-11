const express = require('express');
const router = express.Router();
const db = require('../db');
const apiKeyAuth = require('../middleware/apiKeyAuth');

router.get('/', apiKeyAuth, (req, res) => {
  db.query('SELECT * FROM menu', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post('/', apiKeyAuth, (req, res) => {
  const { nama_menu, harga } = req.body;
  db.query(
    'INSERT INTO menu (nama_menu, harga) VALUES (?, ?)',
    [nama_menu, harga],
    () => res.json({ message: 'Menu ditambahkan' })
  );
});

module.exports = router;
