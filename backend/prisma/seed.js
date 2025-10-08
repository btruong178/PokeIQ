import axios from 'axios';
import { PrismaClient } from '@prisma/client';

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

const checkIfPokemonPopulated = async () => {
    const count = await prisma.pokemon.count();
    return count > 0;
}

const checkIfTypesPopulated = async () => {
    const count = await prisma.types.count();
    return count > 0;
}

const cleanPokemonDB = async () => {
    try {
        await prisma.pokemon.deleteMany({});
        console.log('Existing Pokémon data deleted');
    } catch (error) {
        logError(error);
    }
}

const Reset_And_AddDataToPokemonDB = async (data) => {
    try {
        await cleanPokemonDB();
        await prisma.pokemon.createMany({ data });
        console.log(`Pokemon data from ${data.length} entries added to the database`);
    } catch (error) {
        logError(error);
    }
}

export const getPokemonData = async (start, end) => {
    try {
        console.log("Gathering Pokémon data from PokeAPI...");
        const data = await Promise.all(
            Array.from({ length: end - start + 1 }, (_, i) => { return start + i })
                .map(async (id) => {
                    const { pokemonName, pokemonTypes } = await fetchPokemonDetails(id);
                    console.log(`Fetched and prepared data for Pokémon ID ${id}: ${pokemonName} (${pokemonTypes})`);
                    return { id, name: pokemonName, type: pokemonTypes };
                })
        );
        return data;
    } catch (error) {
        logError(error);
    }
};


// Fetch Pokémon data (name + types)
const fetchPokemonDetails = async (pokemonID) => {
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
const startPokeID = parseInt(process.argv[2]) || 1;  // Default to 1 if not provided
const endPokeID = parseInt(process.argv[3]) || 1025; // Default to 1025 if not provided

console.log(`Seeding Pokemon from ID ${startPokeID} to ${endPokeID}`);
Reset_And_AddDataToPokemonDB(await getPokemonData(startPokeID, endPokeID));