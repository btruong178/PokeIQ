import axios from 'axios';
import { PrismaClient } from '../generated/prisma-client/index.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load local env for dev (matches backend db.js behaviour)
dotenv.config({ path: path.join(__dirname, '../.env.dev') });

const prisma = new PrismaClient();
const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const fetchPokemonData = async (pokemonID) => {
    const resp = await axios.get(`${POKEMON_BASE_URL}${pokemonID}`);
    const { forms, types } = resp.data;
    const pokemonName = capitalizeFirstLetter(forms[0].name);
    const pokemonTypes = types.map(t => capitalizeFirstLetter(t.type.name)).join('/');
    return { pokemonName, pokemonTypes };
};

const seed = async (start = 1, end = 1025, clearBeforeSeed = true) => {
    try {
        console.log(`Seeding Pokémon ${start}..${end} (clearBeforeSeed=${clearBeforeSeed})`);
        if (clearBeforeSeed) {
            await prisma.pokemon.deleteMany();
            console.log('Cleared existing pokemon rows');
        }

        for (let id = start; id <= end; id++) {
            try {
                const { pokemonName, pokemonTypes } = await fetchPokemonData(id);
                // Insert using Prisma (matches pokeToDB.js usage of prisma.pokemon.create)
                await prisma.pokemon.create({
                    data: {
                        name: pokemonName,
                        type: pokemonTypes
                    }
                });
                if (id % 50 === 0) console.log(`Inserted up to id ${id}`);
            } catch (innerErr) {
                console.error(`Failed for id ${id}:`, innerErr.message || innerErr);
            }
        }

        console.log('Seeding complete');
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await prisma.$disconnect();
    }
};

// Allow override via CLI: node seed.js 1 500 false
const args = process.argv.slice(2).map(a => (isNaN(a) ? a : Number(a)));
const [startArg, endArg, clearArg] = args;
const start = startArg ?? 1;
const end = endArg ?? 1025;
const clearBeforeSeed = clearArg === undefined ? true : (clearArg === 'true' || clearArg === true);

seed(start, end, clearBeforeSeed);