import axios from 'axios';
import pool from '../db.js';

// Constants for the API URLs and line separator
const LINE_SEPARATOR = '----------------------------------------';
const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const TYPE_BASE_URL = 'https://pokeapi.co/api/v2/type/';

// Utility function for logging errors
const logError = (error) => {
    console.error('Error Details from attempting to fetch PokeAPI Data: ', error);
    console.error(LINE_SEPARATOR);
    if (error.response) {
        console.error('Error Response Data: ', error.response.data);
        console.error('Error Response Status: ', error.response.status);
        console.error('Error Response Headers: ', error.response.headers);
    } else if (error.request) {
        console.error('Error Request Data: ', error.request);
    } else {
        console.error('Error Message: ', error.message);
    }
    console.error(LINE_SEPARATOR);
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to fetch Pokémon data
const fetchPokemonData = async (pokemonID) => {
    const response = await axios.get(`${POKEMON_BASE_URL}${pokemonID}`);
    const { forms, types, id } = response.data;
    const pokemonName = capitalizeFirstLetter(forms[0].name);
    const pokemonTypes = types.map(t => capitalizeFirstLetter(t.type.name)).join('/');
    return { pokemonName, pokemonTypes };
};

// Function to fetch Type data
const fetchTypeData = async (typeID) => {
    let damageRelationsDictionary = {};
    const response = await axios.get(`${TYPE_BASE_URL}${typeID}`);
    const { damage_relations, name } = response.data;
    const typeName = capitalizeFirstLetter(name);
    Object.entries(damage_relations).forEach(([key, value]) => {
        damageRelationsDictionary[key] = value.map(t => t.name);
    });
    return { damageRelationsDictionary, typeName };
};

// Function to check if the database connection is established function
const checkDBConnection = () => {
    console.log('Pool Credentials:', pool.options);
}


// Function to add Pokémon data to the database
const addToPokemonDB = async () => {
    try {
        console.log("Adding Pokémon data to the 'pokemon' database...");
        for (let i = 1; i <= 1025; i++) {
            const { pokemonName, pokemonTypes } = await fetchPokemonData(i);
            const newPokemon = await pool.query('INSERT INTO pokemon (name, type) VALUES ($1, $2) RETURNING *', [pokemonName, pokemonTypes]);
        }
    } catch (error) {
        logError(error);
    }
    console.log('Pokemon data added to the database successfully!');
};

// Function to add Types data to the database
const addToTypesDB = async () => {
    try {
        console.log("Adding types data to the 'types' database...");
        for (let i = 1; i <= 18; i++) {
            const { damageRelationsDictionary, typeName } = await fetchTypeData(i);
            const newType = await pool.query('INSERT INTO types (name, damage_relations) VALUES ($1, $2) RETURNING *', [typeName, damageRelationsDictionary]);
        }
    } catch (error) {
        logError(error);
    }
    console.log('Types data added to the database successfully!');
}

const showPokemonDBstructure = async () => {
    try {
        const result = await pool.query('SELECT * FROM pokemon');
        console.log(result.rows);
    } catch (error) {
        logError(error);
    }
};
const showTypesDBstructure = async () => {
    try {
        const result = await pool.query('SELECT * FROM types');
        console.log(result.rows);
    } catch (error) {
        logError(error);
    }
};
const showDBstructures = async () => {
    try {
        showPokemonDBstructure();
        showTypesDBstructure();
    } catch (err) {
        logError(err);
    }
};
const deleteDataAndResetAI = async () => {
    try {
        console.log('Deleting data from the database...');
        await pool.query('DELETE FROM pokemon');
        await pool.query('DELETE FROM types');
        console.log('Resetting auto-increment IDs...');
        await pool.query('ALTER SEQUENCE pokemon_id_seq RESTART WITH 1');
        await pool.query('ALTER SEQUENCE types_id_seq RESTART WITH 1');
    } catch (error) {
        logError(error);
    }
};
const checkIfDBisPopulated = async () => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM pokemon');
        if (result.rows[0].count > 0) {
            console.log('DB is already populated');
            await deleteDataAndResetAI();
            return true;
        } else {
            console.log('DB is empty');
            return false;
        }
    } catch (error) {
        logError(error);
    }
};


// Execute the functions
const num = 2; // Change this number to test the different functions
// switch statement
switch (num) {
    case 1:
        fetchPokemonData(1);
        fetchTypeData(1);
        break;
    case 2:
        await checkIfDBisPopulated();
        await addToPokemonDB();
        await addToTypesDB();
        console.log('All data added to the database successfully!');
        break;
    case 3:
        checkDBConnection();
        break;
    case 4:
        showDBstructures();
        break;
    case 5:
        deleteDataAndResetAI();
        break;
    default:
        console.log('Invalid number');
}


// https://pokeapi.co/api/v2/pokemon =  id, name, type(https://pokeapi.co/api/v2/type), image,
//                                      cries, height, weight, abilities, species(https://pokeapi.co/api/v2/pokemon-species)
// https://pokeapi.co/api/v2/pokemon-species = flavor_text_entries, generation("https://pokeapi.co/api/v2/generation")
// https://pokeapi.co/api/v2/generation = main_region
// https://pokeapi.co/api/v2/type = damage_relations

