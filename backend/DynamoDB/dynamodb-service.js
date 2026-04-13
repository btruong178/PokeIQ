/**
 * @file
 * @description
 * Module for interacting with AWS DynamoDB
 * @module DynamoDB
 * @see module:DynamoDB-API
 * */
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, BatchWriteCommand, DeleteCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { logSuccess, logError } from '../utils/Logger.js';

/**
 * Pokemon item stored in the Pokemon table.
 * @typedef {Object} module:DynamoDB~PokemonItem
 * @property {number} id - Pokemon ID (partition key).
 * @property {string} name - Pokemon name.
 * @property {string} type - Pokemon type string, for example "Grass/Poison".
 */

/**
 * Key object used for Pokemon table operations.
 * @typedef {Object} module:DynamoDB~PokemonKey
 * @property {number} id - Pokemon ID key.
 */

/**
 * Type reference entry used in damage relation arrays.
 * @typedef {Object} module:DynamoDB~TypeReference
 * @property {string} name - Pokemon type name.
 * @property {string} url - PokeAPI URL for the type.
 */

/**
 * Damage relation payload returned for each Pokemon type.
 * @typedef {Object} module:DynamoDB~DamageRelations
 * @property {module:DynamoDB~TypeReference[]} double_damage_from - Types that deal double damage to this type.
 * @property {module:DynamoDB~TypeReference[]} double_damage_to - Types this type deals double damage to.
 * @property {module:DynamoDB~TypeReference[]} half_damage_from - Types that deal half damage to this type.
 * @property {module:DynamoDB~TypeReference[]} half_damage_to - Types this type deals half damage to.
 * @property {module:DynamoDB~TypeReference[]} no_damage_from - Types that deal no damage to this type.
 * @property {module:DynamoDB~TypeReference[]} no_damage_to - Types this type deals no damage to.
 */

/**
 * Type item stored in the Types table.
 * @typedef {Object} module:DynamoDB~TypeItem
 * @property {number} id - Type ID.
 * @property {string} name - Type name (partition key).
 * @property {module:DynamoDB~DamageRelations} damage_relations - Type matchup data.
 */

/**
 * Key object used for Types table operations.
 * @typedef {Object} module:DynamoDB~TypeKey
 * @property {string} name - Type name key.
 */

/**
 * Union for supported item shapes written by this service.
 * @typedef {module:DynamoDB~PokemonItem|module:DynamoDB~TypeItem} module:DynamoDB~TableItem
 */

/**
 * Union for supported key shapes used by this service.
 * @typedef {module:DynamoDB~PokemonKey|module:DynamoDB~TypeKey} module:DynamoDB~TableKey
 */
/**
 * @memberof module:DynamoDB
 * @class DynamoDBService
 * @description
 * A service class that encapsulates interactions with AWS DynamoDB using AWS SDK v3.
 * Provides various methods for performing CRUD operations, batch operations, and health checks on DynamoDB tables.
 */
export class DynamoDBService {
    constructor() {
        this.ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
        this.ddbDocClient = DynamoDBDocumentClient.from(this.ddbClient);
    }
    /**
     * @description
     * Performs a health check by listing DynamoDB tables to verify connectivity and permissions.
     * @returns {Promise<Object>} Resolves with the list of tables.
     * @throws Will throw an error if the health check fails.
      * @example
      * const service = new DynamoDBService();
      * const tables = await service.healthCheck();
      * console.log(tables.TableNames);
     */
    async healthCheck() {
        try {
            const command = new ListTablesCommand({});
            const result = await this.ddbClient.send(command);
            logSuccess('DynamoDBService.healthCheck', 'Successfully connected to DynamoDB', result);
            return result;
        } catch (err) {
            logError('DynamoDBService.healthCheck', err);
            throw err;
        }
    }

    /**
     * @description
     * Puts an item into the specified DynamoDB table.
     * @param {string} tableName - The name of the table.
      * @param {module:DynamoDB~TableItem} item - The item to put into the table.
     * @returns {Promise<Object>} Resolves with the response from DynamoDB.
     * @throws Will throw an error if the operation fails.
      * @example
      * const service = new DynamoDBService();
      * await service.putItem(process.env.DYNAMODB_TABLE_NAME_POKEMON, {
      *   id: 25,
      *   name: 'Pikachu',
      *   type: 'Electric'
      * });
      * @example
      * await service.putItem(process.env.DYNAMODB_TABLE_NAME_TYPES, {
      *   id: 10,
      *   name: 'fire',
      *   damage_relations: {
      *     double_damage_from: [{ name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' }],
      *     double_damage_to: [{ name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }],
      *     half_damage_from: [{ name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' }],
      *     half_damage_to: [{ name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' }],
      *     no_damage_from: [],
      *     no_damage_to: []
      *   }
      * });
     */
    async putItem(tableName, item) {
        try {
            const params = {
                TableName: tableName,
                Item: item
            };
            const command = new PutCommand(params);
            const response = await this.ddbDocClient.send(command);
            console.log('✅ DynamoDB PutItem succeeded:', response);
            return response;
        } catch (err) {
            logError('DynamoDBService.putItem', err, { tableName, item });
            throw err;
        }
    }

    /**
     * @description
     * Deletes an item from the specified DynamoDB table.
     * @param {string} tableName - The name of the table.
      * @param {module:DynamoDB~TableKey} key - The primary key object for the item to delete.
     * @returns {Promise<Object>} Resolves with the response from DynamoDB.
     * @throws Will throw an error if the operation fails.
      * @example
      * const service = new DynamoDBService();
      * await service.deleteItem(process.env.DYNAMODB_TABLE_NAME_POKEMON, { id: 25 });
      * @example
      * await service.deleteItem(process.env.DYNAMODB_TABLE_NAME_TYPES, { name: 'fire' });
     */
    async deleteItem(tableName, key) {
        try {
            const params = {
                TableName: tableName,
                Key: key
            };
            const command = new DeleteCommand(params);
            const response = await this.ddbDocClient.send(command);
            logSuccess('DynamoDBService.deleteItem', 'Item deleted successfully', { tableName, key });
            return response;
        } catch (err) {
            logError('DynamoDBService.deleteItem', err, { tableName, key });
            throw err;
        }
    }

    /**
     * @description
     * Retrieves an item from the specified DynamoDB table.
     * @param {string} tableName - The name of the table.
      * @param {module:DynamoDB~TableKey} key - The primary key object for the item to get.
      * @returns {Promise<module:DynamoDB~TableItem|null>} Resolves with the retrieved item or null.
     * @throws Will throw an error if the operation fails.
      * @example
      * const service = new DynamoDBService();
      * const pokemon = await service.getItem(process.env.DYNAMODB_TABLE_NAME_POKEMON, { id: 25 });
      * @example
      * const typeData = await service.getItem(process.env.DYNAMODB_TABLE_NAME_TYPES, { name: 'fire' });
     */
    async getItem(tableName, key) {
        try {
            const params = {
                TableName: tableName,
                Key: key
            };
            const command = new GetCommand(params);
            const response = await this.ddbDocClient.send(command);
            logSuccess('DynamoDBService.getItem', 'Item retrieved successfully', { tableName, key, item: response.Item });
            return response.Item || null;
        } catch (err) {
            logError('DynamoDBService.getItem', err, { tableName, key });
            throw err;
        }
    }

    /**
     * @description
     * Puts multiple items into the specified DynamoDB table in batches.
     * @param {string} tableName - The name of the table.
      * @param {module:DynamoDB~TableItem[]} items - Array of items to put into the table.
      * @returns {Promise<object[]>} Resolves with the responses from DynamoDB.
     * @throws Will throw an error if the operation fails.
      * @example
      * const service = new DynamoDBService();
      * await service.batchPutItems(process.env.DYNAMODB_TABLE_NAME_POKEMON, [
      *   { id: 1, name: 'Bulbasaur', type: 'Grass/Poison' },
      *   { id: 2, name: 'Ivysaur', type: 'Grass/Poison' }
      * ]);
      * @example
      * await service.batchPutItems(process.env.DYNAMODB_TABLE_NAME_TYPES, [
      *   {
      *     id: 10,
      *     name: 'fire',
      *     damage_relations: {
      *       double_damage_from: [{ name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' }],
      *       double_damage_to: [{ name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }],
      *       half_damage_from: [{ name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' }],
      *       half_damage_to: [{ name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' }],
      *       no_damage_from: [],
      *       no_damage_to: []
      *     }
      *   }
      * ]);
     */
    async batchPutItems(tableName, items) {
        try {
            const BATCH_SIZE = 25;
            const results = [];

            for (let i = 0; i < items.length; i += BATCH_SIZE) {
                const chunk = items.slice(i, i + BATCH_SIZE);

                const putRequests = chunk.map(item => ({ PutRequest: { Item: item } }));
                const command = new BatchWriteCommand({ RequestItems: { [tableName]: putRequests } });
                const response = await this.ddbDocClient.send(command);
                results.push(response);

                // Retry for any unprocessed items
                let unprocessed = response.UnprocessedItems?.[tableName] || [];
                let attempt = 0;
                while (unprocessed.length && attempt < 5) {
                    const retryResp = await this.ddbDocClient.send(new BatchWriteCommand({
                        RequestItems: { [tableName]: unprocessed }
                    }));
                    results.push(retryResp);
                    unprocessed = retryResp.UnprocessedItems?.[tableName] || [];
                    attempt++;
                    if (unprocessed.length) await new Promise(r => setTimeout(r, 2 ** attempt * 100));
                }
                if (unprocessed.length) {
                    logError('DynamoDBService.batchPutItems', new Error('UnprocessedItems remain'), {
                        tableName,
                        remaining: unprocessed.length
                    });
                    throw new Error('Failed to put all items after retries');
                }

                logSuccess('DynamoDBService.batchPutItems', 'Batch put chunk succeeded', {
                    tableName,
                    chunkIndex: Math.floor(i / BATCH_SIZE) + 1,
                    chunkSize: chunk.length
                });
            }

            return results;
        } catch (err) {
            logError('DynamoDBService.batchPutItems', err, { tableName, itemsCount: items.length });
            throw err;
        }
    }
    /**
     * @description
     * Deletes multiple items from the specified DynamoDB table in batches.
     * @param {string} tableName - The name of the table.
      * @param {module:DynamoDB~TableKey[]} keys - Array of key objects to delete.
      * @returns {Promise<object[]>} Resolves with the responses from DynamoDB.
     * @throws Will throw an error if the operation fails.
      * @example
      * const service = new DynamoDBService();
      * await service.batchDeleteItems(process.env.DYNAMODB_TABLE_NAME_POKEMON, [
      *   { id: 1 },
      *   { id: 2 },
      *   { id: 3 }
      * ]);
      * @example
      * await service.batchDeleteItems(process.env.DYNAMODB_TABLE_NAME_TYPES, [
      *   { name: 'fire' },
      *   { name: 'water' }
      * ]);
     */
    async batchDeleteItems(tableName, keys) {
        try {
            const BATCH_SIZE = 25;
            const results = [];

            for (let i = 0; i < keys.length; i += BATCH_SIZE) {
                const chunk = keys.slice(i, i + BATCH_SIZE);

                const deleteRequests = chunk.map(key => ({ DeleteRequest: { Key: key } }));
                const command = new BatchWriteCommand({ RequestItems: { [tableName]: deleteRequests } });
                const response = await this.ddbDocClient.send(command);
                results.push(response);

                // Optional simple retry for any unprocessed items
                let unprocessed = response.UnprocessedItems?.[tableName] || [];
                let attempt = 0;
                while (unprocessed.length && attempt < 5) {
                    const command = new BatchWriteCommand({ RequestItems: { [tableName]: unprocessed } });
                    const retryResp = await this.ddbDocClient.send(command);
                    results.push(retryResp);
                    unprocessed = retryResp.UnprocessedItems?.[tableName] || [];
                    attempt++;
                    if (unprocessed.length) await new Promise(r => setTimeout(r, 2 ** attempt * 100));
                }
                if (unprocessed.length) {
                    logError('DynamoDBService.batchDeleteItems', new Error('UnprocessedItems remain'), {
                        tableName,
                        remaining: unprocessed.length
                    });
                    throw new Error('Failed to delete all items after retries');
                }

                logSuccess('DynamoDBService.batchDeleteItems', 'Batch delete chunk succeeded', {
                    tableName,
                    chunkIndex: Math.floor(i / BATCH_SIZE) + 1,
                    chunkSize: chunk.length
                });
            }

            return results;
        } catch (err) {
            logError('DynamoDBService.batchDeleteItems', err, { tableName, keysCount: keys.length });
            throw err;
        }
    }

    /**
     * @description
     * Scans the specified DynamoDB table and retrieves all items.
        * @param {string} tableName - The name of the table.
        * @returns {Promise<module:DynamoDB~TableItem[]>} Resolves with all items from the specified table.
     * @throws Will throw an error if the operation fails.
        * @example
        * const service = new DynamoDBService();
        * const allTypes = await service.scanTable(process.env.DYNAMODB_TABLE_NAME_TYPES);
        * console.log(allTypes.length);
     */
    async scanTable(tableName) {
        try {
            const params = { TableName: tableName };
            const command = new ScanCommand(params);
            const response = await this.ddbDocClient.send(command);
            return response.Items || [];
        } catch (err) {
            logError('DynamoDBService.scanTable', err, { tableName });
            throw err;
        }
    }
}