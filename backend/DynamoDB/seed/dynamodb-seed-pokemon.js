import prompts from 'prompts';
import axios from 'axios';
import { DynamoDBService } from "../dynamodb-service.js";
import { logError, logSuccess } from '../../utils/logger.js';
import { capitalizeFirstLetter } from '../../utils/stringUtils.js';

// Initalize Clients
const dynamoDBService = new DynamoDBService();


// Get Arguments from command line for seeding range
const startPokeID = parseInt(process.argv[2]) || 1; // Default to 1 if not provided
const endPokeID = parseInt(process.argv[3]) || 1025; // Default to 1025 if not provided

// Tables
const pokemonTableName = process.env.DYNAMODB_TABLE_NAME_POKEMON;

// API URLs from PokeAPI
const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Interactive seeding with prompts
const interactiveSeed = async () => {
    try {
        console.log('=== Pokémon Data Seeder ===\n');

        const { action } = await prompts({
            type: 'select',
            name: 'action',
            message: 'Select action',
            choices: [
                { title: 'Seed Pokémon Data', value: 1 },
                { title: 'Batch Delete Pokémon Data', value: 2 },
                { title: 'Get Pokémon', value: 3 },
            ],
            initial: 0,
        });

        if (!action) {
            throw new Error('Seeding operation cancelled by user.');
        }

        // Ask different prompts depending on the selected action
        switch (action) {
            case 1:
                const { startID, endID } = await prompts([
                    {
                        type: 'number',
                        name: 'startID',
                        message: 'Enter starting Pokémon ID:',
                        validate: v => (v > 0 && v <= 1025) ? true : 'Must be greater than 0 and less than or equal to 1025',
                    },
                    {
                        type: 'number',
                        name: 'endID',
                        message: 'Enter ending Pokémon ID:',
                        validate: v => (v > 0 && v <= 1025) ? true : 'Must be > 0 and <= 1025',
                    },
                ]);

                if (!startID || !endID) throw new Error('Operation cancelled.');
                if (endID < startID) throw new Error('Ending ID must be >= Starting ID.');

                console.log(`\nSeeding Pokémon from ID ${startID} to ${endID}...\n`);
                await seedPokemonData(startID, endID);
                break;

            case 2:
                const { startID: deleteStartID, endID: deleteEndID } = await prompts([
                    {
                        type: 'number',
                        name: 'startID',
                        message: 'Enter starting Pokémon ID to delete:',
                        validate: v => (v > 0 && v <= 1025) ? true : 'Must be greater than 0',
                    },
                    {
                        type: 'number',
                        name: 'endID',
                        message: 'Enter ending Pokémon ID to delete:',
                        validate: v => (v > 0 && v <= 1025) ? true : 'Must be > 0 and <= 1025',
                    },
                ]);

                if (!deleteStartID || !deleteEndID) throw new Error('Operation cancelled.');
                if (deleteEndID < deleteStartID) throw new Error('Ending ID must be >= Starting ID.');

                console.log(`\nDeleting Pokémon from ID ${deleteStartID} to ${deleteEndID}...\n`);
                await batchDeletePokemonData(deleteStartID, deleteEndID);
                break;

            case 3:
                const { id } = await prompts({
                    type: 'number',
                    name: 'id',
                    message: 'Enter Pokémon ID to fetch:',
                    validate: v => (v > 0 && v <= 1025) ? true : 'Must be greater than 0 and less than or equal to 1025',
                });

                if (!id) throw new Error('Operation cancelled.');

                console.log(`\nGetting Pokémon with ID ${id}...\n`);
                await getPokemonData(id);
                break;
        }
    } catch (error) {
        logError('interactiveSeed', error, { startPokeID, endPokeID });
    }
};

// Query Pokémon data from DynamoDB
const getPokemonData = async (startPokeID) => {
    try {
        const pokemonData = await dynamoDBService.getItem(pokemonTableName, { id: startPokeID });
    } catch (error) {
        logError('getPokemonData', error, { startPokeID, endPokeID });
    }
};


// Batch Delete Pokémon data from DynamoDB
const batchDeletePokemonData = async (startPokeID, endPokeID) => {
    try {
        const toDelete = Array.from({ length: endPokeID - startPokeID + 1 }, (_, i) => startPokeID + i)
            .map(num => ({ id: num }));
        await dynamoDBService.batchDeleteItems(pokemonTableName, toDelete);
    } catch (error) {
        logError('deletePokemonData', error, { startPokeID, endPokeID });
    }
}

// Fetch Pokémon data based on ID
const fetchPokemonDetails_PokeAPI = async (pokemonID) => {
    try {
        // Temp fix for Pikachu ID
        if (pokemonID === 25) {
            pokemonID = "pikachu";
        }
        const response = await axios.get(`${POKEMON_BASE_URL}${pokemonID}`);
        const { forms, types } = response.data;
        const pokemonName = capitalizeFirstLetter(forms[0].name);
        const pokemonTypes = types.map(t => capitalizeFirstLetter(t.type.name)).join('/');
        return { pokemonName, pokemonTypes };
    } catch (error) {
        logError('fetchPokemonDetails_PokeAPI', error);
    }
};

// Aggregate Pokémon data from start to end ID fetched from PokeAPI
const aggregatePokemonData = async (startPokeID, endPokeID) => {
    try {
        const data = await Promise.all(
            Array.from({ length: endPokeID - startPokeID + 1 }, (_, i) => { return startPokeID + i })
                .map(async (id) => {
                    const { pokemonName, pokemonTypes } = await fetchPokemonDetails_PokeAPI(id);
                    return { id, name: pokemonName, type: pokemonTypes };
                })
        );
        logSuccess('aggregatePokemonData', `Fetched data for Pokémon IDs ${startPokeID} to ${endPokeID}`, { count: data.length });
        return data;
    } catch (error) {
        logError(error);
    }
};


// Seed Pokémon data into DynamoDB
const seedPokemonData = async (startPokeID, endPokeID) => {
    try {
        const pokemonData = await aggregatePokemonData(startPokeID, endPokeID);
        await dynamoDBService.batchPutItems(pokemonTableName, pokemonData);
    } catch (error) {
        logError('seedPokemonData', error, { startPokeID, endPokeID });
    }
};



interactiveSeed();
