import axios from 'axios';
import { DynamoDBService } from "./dynamodb-service.js";
import { logError, logSuccess } from '../utils/logger.js';
import { capitalizeFirstLetter } from '../utils/stringUtils.js';

// Initialize Clients
const dynamoDBService = new DynamoDBService();

// Get Arguments from command line for seeding range
const startPokeID = parseInt(process.argv[2]) || 1; // Default to 1 if not provided
const endPokeID = parseInt(process.argv[3]) || 1025; // Default to 1025 if not provided

// Tables
const pokemonTableName = process.env.DYNAMODB_TABLE_NAME_POKEMON;
const typesTableName = process.env.DYNAMODB_TABLE_NAME_TYPES;

// API URLs from PokeAPI
const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const TYPE_BASE_URL = 'https://pokeapi.co/api/v2/type/';


// Fetch Pokémon data based on ID
const fetchPokemonDetails_PokeAPI = async (pokemonID) => {
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

// Aggregate Pokémon data from start to end ID fetched from PokeAPI
const getPokemonData = async (startPokeID, endPokeID) => {
    try {
        console.log("Gathering Pokémon data from PokeAPI...");
        const data = await Promise.all(
            Array.from({ length: endPokeID - startPokeID + 1 }, (_, i) => { return startPokeID + i })
                .map(async (id) => {
                    const { pokemonName, pokemonTypes } = await fetchPokemonDetails_PokeAPI(id);
                    console.log(`Fetched and prepared data for Pokémon ID ${id}: ${pokemonName} (${pokemonTypes})`);
                    return { id, name: pokemonName, type: pokemonTypes };
                })
        );
        logSuccess('getPokemonData', `Fetched data for Pokémon IDs ${startPokeID} to ${endPokeID}`, { count: data.length });
        return data;
    } catch (error) {
        logError(error);
    }
};


// Seed Pokémon data into DynamoDB
const seedPokemonData = async (startPokeID, endPokeID) => {
    try {
        const pokemonData = await getPokemonData(startPokeID, endPokeID);
        for (const pokemon of pokemonData) {
            await dynamoDBService.putItem(pokemonTableName, pokemon);
        }
        console.log(`Successfully seeded Pokémon data from ID ${startPokeID} to ${endPokeID}`);

    } catch (error) {
        logError(error);
    }
};

seedPokemonData(startPokeID, endPokeID);



