const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 3000;

// Konfigurasi MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'transbaja',
});

// Membuka koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database');
});

// Endpoint untuk mengambil data barang
app.get('/barang', (req, res) => {
  const sql = 'SELECT * FROM barang';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Mendapatkan data barang berdasarkan kode barang
app.get('/barang/:kode_barang', (req, res) => {
  const { kode_barang } = req.params;
  const sql = 'SELECT * FROM barang WHERE kode_barang = ?';

  db.query(sql, [kode_barang], (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results[0]);
  });
});

// Menambahkan data barang
app.post('/barang', (req, res) => {
  const { kode_barang, nama_barang, kode_jenis, harga_jual_satuan, jumlah_stok } = req.body;
  const sql = 'INSERT INTO barang (kode_barang, nama_barang, kode_jenis, harga_jual_satuan, jumlah_stok) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [kode_barang, nama_barang, kode_jenis, harga_jual_satuan, jumlah_stok], (err) => {
    if (err) {
      throw err;
    }
    res.send('Data barang berhasil ditambahkan');
  });
});

// Mengupdate data barang
app.put('/barang/:kode_barang', (req, res) => {
  const { kode_barang } = req.params;
  const { nama_barang, kode_jenis, harga_jual_satuan, jumlah_stok } = req.body;
  const sql = 'UPDATE barang SET nama_barang = ?, kode_jenis = ?, harga_jual_satuan = ?, jumlah_stok = ? WHERE kode_barang = ?';

  db.query(sql, [nama_barang, kode_jenis, harga_jual_satuan, jumlah_stok, kode_barang], (err) => {
    if (err) {
      throw err;
    }
    res.send('Data barang berhasil diupdate');
  });
});

// Menghapus data barang
app.delete('/barang/:kode_barang', (req, res) => {
  const { kode_barang } = req.params;
  const sql = 'DELETE FROM barang WHERE kode_barang = ?';

  db.query(sql, [kode_barang], (err) => {
    if (err) {
      throw err;
    }
    res.send('Data barang berhasil dihapus');
  });
});

// Menjalankan server
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
