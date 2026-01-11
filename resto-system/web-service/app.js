const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/menu', require('./routes/menu'));
app.use('/api/transaksi', require('./routes/transaction'));

app.listen(3000, () => {
  console.log('Web Service running on http://localhost:3000');
});
