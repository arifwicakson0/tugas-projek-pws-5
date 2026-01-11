const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: User membuat pesanan
router.post('/', (req, res) => {
    const { menu_name, price, customer_name } = req.body;
    
    // Validasi: Nama pelanggan wajib diisi
    if (!menu_name || !price || !customer_name) {
        return res.status(400).json({ message: 'Nama pelanggan dan data menu harus lengkap!' });
    }

    const sql = 'INSERT INTO transactions (menu_name, price, customer_name) VALUES (?, ?, ?)';
    db.query(sql, [menu_name, price, customer_name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal mencatat pesanan' });
        }
        res.status(201).json({ message: 'Pesanan diterima dapur!', id: result.insertId });
    });
});

// GET: Admin melihat riwayat
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM transactions ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;