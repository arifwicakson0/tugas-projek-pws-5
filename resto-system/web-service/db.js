const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // Pastikan user benar
  password: '',     // Pastikan password sesuai settingan XAMPP (default kosong)
  database: 'resto_db' // Pastikan database ini sudah dibuat di phpMyAdmin
});

db.connect(err => {
  if (err) {
    console.error('❌ Gagal Konek Database:');
    console.error('   Kode Error: ' + err.code);
    console.error('   Pesan: ' + err.message);
    
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 TIPS: Coba buat database "resto_db" dulu di phpMyAdmin.');
    } else if (err.code === 'ECONNREFUSED') {
      console.log('💡 TIPS: Pastikan XAMPP/MySQL sudah di-START.');
    }
    return;
  }
  console.log('✅ Database connected success!');
});

module.exports = db;