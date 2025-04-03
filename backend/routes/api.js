import express from 'express';
import pool from '../db.js';
const router = express.Router();


router.get('/check', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'API is Working!', time: result.rows[0] });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

export default router;