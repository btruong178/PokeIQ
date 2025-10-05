import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

router.get('/random_pokemon', async (req, res) => {
    try {
        const result = await prisma.pokemon.findMany({
            orderBy: {
                id: 'asc',
            },
            take: 1,
        });
        res.json(result[0]);
    } catch (err) {
        console.error('Database query error (pokemon/random_pokemon):', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/damage_relations/:typeName', async (req, res) => {
    try {
        const { typeName } = req.params;
        const result = await prisma.type.findUnique({
            where: {
                name: typeName.toLowerCase(),
            },
        });
        if (!result) {
            return res.status(404).json({ errorMessage: 'Type not found' });
        }
        res.json(result);
    } catch (err) {
        console.error('Database query error (pokemon/damage_relations/:typeName):', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
})


export default router;