import axios from 'axios';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
const LINE_SEPARATOR = '----------------------------------------';
// API URLs
const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Logging utility
const logError = (error) => {
    console.error('Error Details from attempting to fetch PokeAPI Data: ', error);
    console.error(LINE_SEPARATOR);
    if (error?.response) {
        console.error('Error Response Data: ', error.response.data);
        console.error('Error Response Status: ', error.response.status);
        console.error('Error Response Headers: ', error.response.headers);
    } else if (error?.request) {
        console.error('Error Request Data: ', error.request);
    } else {
        console.error('Error Message: ', error?.message);
    }
    console.error(LINE_SEPARATOR);
};

// Capitalize helper
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const cleanAndSeedPokemonDB = async (start, end) => {
    try {
        await prisma.pokemon.deleteMany({});
        console.log('Existing Pokémon data deleted successfully!');
        // await prisma.$executeRaw`ALTER SEQUENCE "Pokemon_id_seq" RESTART WITH 1;`;
        // console.log('ID sequence reset successfully!');
        var data = [];
        console.log("Adding Pokémon data to the 'pokemon' table...");
        for (let i = start; i <= end; i++) {
            const { pokemonName, pokemonTypes } = await fetchPokemonData(i);
            data.push({ id: i, name: pokemonName, type: pokemonTypes });
            console.log(`Fetched and prepared data for Pokémon ID ${i}: ${pokemonName} (${pokemonTypes})`);
        }
        await prisma.pokemon.createMany({ data });
        console.log('Pokemon data added to the database successfully!');
    } catch (error) {
        logError(error);
    }
};

// Fetch Pokémon data (name + types)
const fetchPokemonData = async (pokemonID) => {
    try {
        const response = await axios.get(`${POKEMON_BASE_URL}${pokemonID}`);
        const { forms, types } = response.data;
        const pokemonName = capitalizeFirstLetter(forms[0].name);
        const pokemonTypes = types.map(t => capitalizeFirstLetter(t.type.name)).join('/');
        return { pokemonName, pokemonTypes };
    } catch (err) {
        logError(err);
        throw err;
    }
};

// Get arguments from command line
const start = parseInt(process.argv[2]) || 1;  // Default to 1 if not provided
const end = parseInt(process.argv[3]) || 1025; // Default to 1025 if not provided

console.log(`Seeding Pokemon from ID ${start} to ${end}`);
cleanAndSeedPokemonDB(start, end);