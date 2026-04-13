/**
 * @file
 * A script to seed the "types" DynamoDB table with damage relations data from the PokeAPI.
 * This script provides an interactive CLI to perform the following actions:
 *   1. Seed Type Damage Relations Data to DynamoDB
 *   2. Get Type Data from DynamoDB by Type Name
 *   3. Batch Delete All Types from DynamoDB
 */
import prompts from 'prompts';
import axios from 'axios';
import { DynamoDBService } from "../dynamodb-service.js";
import { logError, logSuccess } from '../../utils/Logger.js';

const typesTableName = process.env.DYNAMODB_TABLE_NAME_TYPES;
const TYPE_BASE_URL = 'https://pokeapi.co/api/v2/type/';

// Initialize Clients
const dynamoDBService = new DynamoDBService();

/**
 * Launches an interactive CLI menu for seeding, querying, or deleting type damage relations data.
 * @returns {Promise<void>}
 */
const interactiveSeed = async () => {
    console.log('=== Type Damage Relations Seeder ===\n');
    try {
        const response = await prompts({
            type: 'select',
            name: 'action',
            message: 'Select action',
            choices: [
                { title: 'Seed Type Damage Relations Data to DynamoDB', value: 1 },
                { title: 'Get Type Data', value: 2 },
                { title: 'Batch Delete All Types', value: 3 }
            ],
            initial: 0,
        });
        if (!response.action) {
            throw new Error('Seeding operation cancelled by user.');
        }
        switch (response.action) {
            case 1:
                console.log('Seeding damage relations data to DynamoDB...');
                await seedDmgData();
                break;
            case 2:
                const { typeName } = await prompts({
                    type: 'text',
                    name: 'typeName',
                    message: 'Enter Type Name to fetch:',
                    validate: v => (v.length > 0) ? true : 'Type Name cannot be empty',
                });
                if (!typeName) throw new Error('Operation cancelled.');
                console.log(`Fetching data for Type Name ${typeName} from DynamoDB...`);
                await getTypeData(typeName);
                break;
            case 3:
                console.log('Deleting all type items from DynamoDB...');
                await batchDeleteTypes();
                break;
        }
    } catch (error) {
        logError('Type Damage Relations Seeder', error);
    }
};

/**
 * Fetches a single type item from the DynamoDB types table by name.
 * @param {string} typeName - The name of the type to fetch (e.g. "fire").
 * @returns {Promise<void>}
 */
const getTypeData = async (typeName) => {
    try {
        const response = await dynamoDBService.getItem(typesTableName, { name: typeName });
    } catch (error) {
        logError('getTypeData', error, { typeName });
    }
}

/**
 * Scans the types table and batch deletes all items.
 * @returns {Promise<void>}
 */
const batchDeleteTypes = async () => {
    try {
        const allItems = await dynamoDBService.scanTable(typesTableName);
        const keys = allItems.map(item => ({ name: item.name }));
        await dynamoDBService.batchDeleteItems(typesTableName, keys);
        logSuccess('batchDeleteTypes', 'All type items deleted successfully');
    } catch (error) {
        logError('batchDeleteTypes', error);
    }
}

/**
 * Fetches damage relations data for a single type from the PokeAPI.
 * @param {number} typeID - The PokeAPI type ID (1–18).
 * @returns {Promise<Object>} The full type data from PokeAPI, including id, name, and damage_relations.
 */
const fetchDamageRelations_PokeAPI = async (typeID) => {
    try {
        const response = await axios.get(`${TYPE_BASE_URL}${typeID}`);
        return response.data;
    } catch (error) {
        logError('fetchDamageRelations_PokeAPI', error, { typeID });
    }
}

/**
 * Fetches and aggregates damage relations for all 18 Pokémon types from the PokeAPI.
 * @returns {Promise<Array<{id: number, name: string, damage_relations: Object}>>} An array of type objects with id, name, and damage_relations.
 */
const aggregateDmgData = async () => {
    try {
        const data = await Promise.all(
            Array.from({ length: 18 }, (_, i) => i + 1)
                .map(async (typeID) => {
                    const { id, name, damage_relations } = await fetchDamageRelations_PokeAPI(typeID);
                    return { id, name, damage_relations };
                })
        );
        console.log(data);
        return data;
    } catch (error) {
        logError('aggregateDmgData', error);
    }
}

/**
 * Aggregates all type damage relations from the PokeAPI and batch writes them to DynamoDB.
 * @returns {Promise<void>}
 */
const seedDmgData = async () => {
    try {
        const dmgData = await aggregateDmgData();
        await dynamoDBService.batchPutItems(typesTableName, dmgData);
    } catch (error) {
        logError('seedDmgData', error);
    }
}


interactiveSeed();