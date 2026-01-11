const express = require('express');
const app = express();
const port = 3001;

// Menyajikan file statis dari folder "public"
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`✅ Client Service jalan di http://localhost:${port}`);
  console.log(`   - Halaman User: http://localhost:${port}/user.html`);
  console.log(`   - Halaman Admin: http://localhost:${port}/admin-menu.html`);
});