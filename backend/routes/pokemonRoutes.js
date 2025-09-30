import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.get('/random_pokemon', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pokemon ORDER BY RANDOM() LIMIT 1');
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database query error (pokemon/random_pokemon):', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/damage_relations/:typeName', async (req, res) => {
    try {
        const { typeName } = req.params;
        const result = await pool.query('SELECT * FROM types WHERE LOWER(name) = LOWER($1)', [typeName]);
        if (result.rows.length === 0) {
            return res.status(404).json({ errorMessage: 'Type not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database query error (pokemon/damage_relations/:typeName):', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
})


export default router;