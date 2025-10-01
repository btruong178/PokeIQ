import express from 'express';
import cors from 'cors';
import apiroutes from './routes/api-routes.js';
import pokemonroutes from './routes/pokemonRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only load .env.backend for local dev when required
if (!process.env.DATABASE_URL || !process.env.PORT) {
    dotenv.config({ path: path.join(__dirname, '../.env.dev') });
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
});

app.use('/api', apiroutes);
app.use('/pokemon', pokemonroutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});