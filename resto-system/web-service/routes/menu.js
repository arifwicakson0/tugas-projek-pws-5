const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Ambil semua menu (Bisa diakses Admin & User)
router.get('/', (req, res) => {
    db.query('SELECT * FROM menus ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST: Tambah menu (Idealnya hanya Admin)
router.post('/', (req, res) => {
    const { nama, harga, deskripsi } = req.body;
    const sql = 'INSERT INTO menus (nama, harga, deskripsi) VALUES (?, ?, ?)';
    db.query(sql, [nama, harga, deskripsi], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Menu berhasil ditambahkan', id: result.insertId });
    });
});

module.exports = router;