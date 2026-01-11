const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const API_KEY = '12345';
const API_URL = 'http://localhost:3000/api';

/* ======================
   HALAMAN USER
====================== */
app.get('/', async (req, res) => {
  const result = await axios.get(`${API_URL}/menu`, {
    headers: { 'x-api-key': API_KEY }
  });

  let cards = '';
  result.data.forEach(m => {
    cards += `
      <div class="col-md-4">
        <div class="card mb-3">
          <div class="card-body">
            <h5>${m.nama_menu}</h5>
            <p>Rp ${m.harga}</p>
            <form method="POST" action="/order">
              <input type="hidden" name="total" value="${m.harga}">
              <input type="hidden" name="nama_pelanggan" value="Pelanggan">
              <button class="btn btn-primary">Pesan</button>
            </form>
          </div>
        </div>
      </div>
    `;
  });

  res.send(`
  <!doctype html>
  <html>
  <head>
    <title>Resto App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body class="container mt-4">
    <h1 class="mb-4">Menu Restoran</h1>
    <div class="row">${cards}</div>
    <a href="/admin" class="btn btn-dark mt-3">Admin</a>
  </body>
  </html>
  `);
});

/* ======================
   ORDER USER
====================== */
app.post('/order', async (req, res) => {
  await axios.post(`${API_URL}/transaksi`, req.body, {
    headers: { 'x-api-key': API_KEY }
  });
  res.redirect('/');
});

/* ======================
   ADMIN
====================== */
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

app.get('/admin/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin-menu.html'));
});

app.post('/admin/menu', async (req, res) => {
  await axios.post(`${API_URL}/menu`, req.body, {
    headers: { 'x-api-key': API_KEY }
  });
  res.redirect('/admin');
});

app.get('/admin/transaksi', async (req, res) => {
  const data = await axios.get(`${API_URL}/transaksi`, {
    headers: { 'x-api-key': API_KEY }
  });

  let rows = '';
  data.data.forEach(t => {
    rows += `
      <tr>
        <td>${t.nama_pelanggan}</td>
        <td>${t.total}</td>
        <td>${t.tanggal}</td>
      </tr>
    `;
  });

  res.send(`
  <!doctype html>
  <html>
  <head>
    <title>Transaksi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body class="container mt-4">
    <h2>Data Transaksi</h2>
    <table class="table table-bordered">
      <tr><th>Pelanggan</th><th>Total</th><th>Tanggal</th></tr>
      ${rows}
    </table>
    <a href="/admin" class="btn btn-secondary">Kembali</a>
  </body>
  </html>
  `);
});

app.listen(4000, () => {
  console.log('Website running at http://localhost:4000');
});
