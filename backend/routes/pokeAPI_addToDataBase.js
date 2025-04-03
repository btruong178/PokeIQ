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

// Function to fetch Pokémon data
const fetchPokemonData = async (pokemonID) => {
    const response = await axios.get(`${POKEMON_BASE_URL}${pokemonID}`);
    const { forms, types, id } = response.data;
    const pokemonName = forms[0].name;
    const pokemonTypes = types.map(t => t.type.name).join('/');
    console.log(`Pokémon ID: ${id}`);
    console.log(`Pokémon Name: ${pokemonName}`);
    console.log(`Pokémon Types: ${pokemonTypes}`);
    return { pokemonName, pokemonTypes };
};

// Function to fetch Type data
const fetchTypeData = async (typeID) => {
    let damageRelationsDictionary = {};
    const response = await axios.get(`${TYPE_BASE_URL}${typeID}`);
    const { damage_relations, name } = response.data;
    const typeName = name;
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
        for (let i = 1; i <= 1025; i++) {
            const { pokemonName, pokemonTypes } = await fetchPokemonData(i);
            const newPokemon = await pool.query('INSERT INTO pokemon (id, name, type) VALUES ($1, $2, $3) RETURNING *', [i, pokemonName, pokemonTypes]);
            console.log(newPokemon.rows[0]);
        }
    } catch (error) {
        logError(error);
    }
};

// Function to add Types data to the database
const addToTypesDB = async () => {
    try {
        for (let i = 1; i <= 18; i++) {
            const { damageRelationsDictionary, typeName } = await fetchTypeData(i);
            const newType = await pool.query('INSERT INTO types (name, damage_relations) VALUES ($1, $2) RETURNING *', [typeName, damageRelationsDictionary]);
            console.log(newType.rows[0]);
        }
    } catch (error) {
        logError(error);
    }
}

// Execute the functions
const num = 5; // Change this number to test the different functions
// switch statement
switch (num) {
    case 1:
        fetchPokemonData(1);
        break;
    case 2:
        fetchTypeData(1);
        break;
    case 3:
        addToPokemonDB();
        break;
    case 4:
        addToTypesDB();
        break;
    case 5:
        checkDBConnection();
        break;
    default:
        console.log('Invalid number');
}


// https://pokeapi.co/api/v2/pokemon =  id, name, type(https://pokeapi.co/api/v2/type), image,
//                                      cries, height, weight, abilities, species(https://pokeapi.co/api/v2/pokemon-species)
// https://pokeapi.co/api/v2/pokemon-species = flavor_text_entries, generation("https://pokeapi.co/api/v2/generation")
// https://pokeapi.co/api/v2/generation = main_region
// https://pokeapi.co/api/v2/type = damage_relations

