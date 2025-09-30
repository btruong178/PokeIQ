import axios from 'axios';
import pool from '../db.js';
import { logError, capitalizeFirstLetter } from './api-utilities.js';

// API URLs
const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';


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

// Add Pokémon entries to DB
const addToPokemonDB = async (start = 1, end = 1025) => {
    try {
        console.log("Adding Pokémon data to the 'pokemon' table...");
        for (let i = start; i <= end; i++) {
            const { pokemonName, pokemonTypes } = await fetchPokemonData(i);
            await pool.query(
                'INSERT INTO pokemon (name, type) VALUES ($1, $2) RETURNING *',
                [pokemonName, pokemonTypes]
            );
            if (i % 50 === 0) console.log(`Inserted up to id ${i}`);
        }
        console.log('Pokemon data added to the database successfully!');
    } catch (error) {
        logError(error);
    }
};

addToPokemonDB();