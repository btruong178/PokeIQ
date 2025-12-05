import prompts from 'prompts';
import axios from 'axios';
import { DynamoDBService } from "../dynamodb-service.js";
import { logError, logSuccess } from '../../utils/logger.js';
import { capitalizeFirstLetter } from '../../utils/stringUtils.js';

const typesTableName = process.env.DYNAMODB_TABLE_NAME_TYPES;
const TYPE_BASE_URL = 'https://pokeapi.co/api/v2/type/';

// Initalize Clients
const dynamoDBService = new DynamoDBService();

const interactiveSeed = async () => {
    console.log('=== Type Damage Relations Seeder ===\n');
    try {
        const response = await prompts({
            type: 'select',
            name: 'action',
            message: 'Select action',
            choices: [
                { title: 'Seed Type Damage Relations Data', value: 1 },
                { title: 'Delete Type Damage Relations Data', value: 2 },
            ],
            initial: 0,
        });
        console.log(response);
        if (!response.action) {
            throw new Error('Seeding operation cancelled by user.');
        }
        if (response.action === 1) {
            console.log('Fetching damage relations for Type ID 1 (Normal)...');
            await fetchDamageRelations_PokeAPI(1);
        }
    } catch (error) {
        logError('Type Damage Relations Seeder', error);
    }
};

const fetchDamageRelations_PokeAPI = async (typeID) => {
    try {
        const response = await axios.get(`${TYPE_BASE_URL}${typeID}`);
        console.log(response.data.damage_relations);
    } catch (error) {
        logError('fetchDamageRelations_PokeAPI', error, { typeID });
    }
}


interactiveSeed();