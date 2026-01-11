const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

// REGISTER: Bisa pilih role (Admin / User)
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    // Validasi input
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, Password, dan Role wajib diisi!' });
    }

    // Buat API Key unik sesuai role
    // Format: "admin-xxx" atau "user-xxx" agar mudah dikenali
    const randomStr = crypto.randomBytes(8).toString('hex');
    const apiKey = `${role}-${randomStr}`;

    const sql = 'INSERT INTO users (username, password, role, api_key) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [username, password, role, apiKey], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Username sudah dipakai, ganti yang lain!' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Registrasi Berhasil!', 
            api_key: apiKey,
            role: role 
        });
    });
});

// LOGIN: Cek username & password
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const user = results[0];
            res.json({
                message: 'Login Berhasil',
                username: user.username,
                role: user.role,
                api_key: user.api_key
            });
        } else {
            res.status(401).json({ message: 'Username atau Password salah!' });
        }
    });
});

module.exports = router;