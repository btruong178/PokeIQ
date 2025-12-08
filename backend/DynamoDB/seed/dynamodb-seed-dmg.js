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
const getTypeData = async (typeName) => {
    try {
        const response = await dynamoDBService.getItem(typesTableName, { name: typeName });
    } catch (error) {
        logError('getTypeData', error, { typeName });
    }
}

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

const fetchDamageRelations_PokeAPI = async (typeID) => {
    try {
        const response = await axios.get(`${TYPE_BASE_URL}${typeID}`);
        return response.data;
    } catch (error) {
        logError('fetchDamageRelations_PokeAPI', error, { typeID });
    }
}

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


const seedDmgData = async () => {
    try {
        const dmgData = await aggregateDmgData();
        await dynamoDBService.batchPutItems(typesTableName, dmgData);
    } catch (error) {
        logError('seedDmgData', error);
    }
}


interactiveSeed();