const express = require('express');
const router = express.Router();
const db = require('../db');
const apiKeyAuth = require('../middleware/apiKeyAuth');

router.get('/', apiKeyAuth, (req, res) => {
  db.query('SELECT * FROM transaksi ORDER BY tanggal DESC', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post('/', apiKeyAuth, (req, res) => {
  const { nama_pelanggan, total } = req.body;
  db.query(
    'INSERT INTO transaksi (nama_pelanggan, total) VALUES (?, ?)',
    [nama_pelanggan, total],
    () => res.json({ message: 'Transaksi tersimpan' })
  );
});

module.exports = router;
