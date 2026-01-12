const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Import koneksi DB yang sudah kita buat

// --- 1. READ (Halaman Utama) ---
router.get('/', async (req, res) => {
    try {
        // Query untuk mengambil data transaksi digabung dengan nama kategori
        const [rows] = await db.query(`
            SELECT t.*, c.category_name 
            FROM transactions t 
            LEFT JOIN categories c ON t.category_id = c.id 
            ORDER BY t.created_at DESC
        `);
        
        // Render view 'index.ejs' dengan data transactions
        res.render('index', { transactions: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Database Error');
    }
});

// --- 2. CREATE (Form Tambah Data) ---
router.get('/add', async (req, res) => {
    try {
        // Ambil data kategori untuk dropdown
        const [categories] = await db.query('SELECT * FROM categories');
        res.render('add', { categories });
    } catch (error) {
        console.error(error);
        res.send('Error loading form');
    }
});

router.post('/add', async (req, res) => {
    const { amount, description, type, category_id } = req.body;
    try {
        await db.query(
            'INSERT INTO transactions (category_id, amount, description, type) VALUES (?, ?, ?, ?)',
            [category_id, amount, description, type]
        );
        res.redirect('/'); // Kembali ke halaman utama setelah simpan
    } catch (error) {
        console.error(error);
        res.send('Error saving data');
    }
});

// --- 3. UPDATE (Edit Data) ---
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Ambil data transaksi spesifik
        const [transactions] = await db.query('SELECT * FROM transactions WHERE id = ?', [id]);
        // Ambil semua kategori untuk dropdown
        const [categories] = await db.query('SELECT * FROM categories');
        
        if (transactions.length === 0) return res.redirect('/');
        
        res.render('edit', { transaction: transactions[0], categories });
    } catch (error) {
        console.error(error);
        res.send('Error loading edit form');
    }
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, description, type, category_id } = req.body;
    try {
        await db.query(
            'UPDATE transactions SET category_id = ?, amount = ?, description = ?, type = ? WHERE id = ?',
            [category_id, amount, description, type, id]
        );
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('Error updating data');
    }
});

// --- 4. DELETE (Hapus Data) ---
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM transactions WHERE id = ?', [id]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('Error deleting data');
    }
});

module.exports = router;