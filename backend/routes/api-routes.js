import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();

const prisma = new PrismaClient();

router.get('/check', async (req, res) => {
    try {
        const result = await prisma.$queryRaw`SELECT NOW()`;
        res.json({ message: 'API is Working!', time: result });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/health-check', async (req, res) => {
    try {
        const result = await prisma.$queryRaw('SELECT NOW()');
        res.status(200).json({ message: 'API is Working!!!', time: result });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

export default router;