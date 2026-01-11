const express = require('express');
const cors = require('cors');
const apiKeyAuth = require('./middleware/apiKeyAuth');
const menuRoutes = require('./routes/menu');
const transactionRoutes = require('./routes/transaction');
const authRoutes = require('./routes/auth'); // <-- Import Auth

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Public (Bisa diakses tanpa login)
app.use('/auth', authRoutes); // <-- Login & Register di sini

// Route Private (Harus pakai API Key)
app.use('/api', apiKeyAuth); 
app.use('/api/menus', menuRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(port, () => {
    console.log(`✅ Backend jalan di http://localhost:${port}`);
});