const db = require('../db');

const apiKeyAuth = (req, res, next) => {
    const clientKey = req.headers['x-api-key'];

    if (!clientKey) {
        return res.status(401).json({ message: 'API Key tidak ditemukan. Silakan Login.' });
    }

    // Cek apakah key ada di tabel users
    const sql = 'SELECT * FROM users WHERE api_key = ?';
    db.query(sql, [clientKey], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database Error' });

        if (results.length > 0) {
            // Simpan data user ke request agar bisa dipakai nanti
            req.user = results[0]; 
            next(); // Kunci Valid -> Lanjut
        } else {
            res.status(401).json({ message: 'API Key TIDAK VALID!' });
        }
    });
};

module.exports = apiKeyAuth;