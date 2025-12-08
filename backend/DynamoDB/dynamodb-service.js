import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, BatchWriteCommand, DeleteCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { logSuccess, logError } from '../utils/logger.js';

export class DynamoDBService {
    constructor() {
        this.ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
        this.ddbDocClient = DynamoDBDocumentClient.from(this.ddbClient);
    }

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

    // @param {string} tableName
    // @param {object} item - Item to put into the table
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

    // @param {string} tableName
    // @param {object} key - Key of the item to delete
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

    // @param {string} tableName
    // @param {object} key - Object representing the primary key of the item to get
    // Example: key = { id: 1 }
    async getItem(tableName, key) {
        try {
            const params = {
                TableName: tableName,
                Key: key
            };
            const command = new GetCommand(params);
            const response = await this.ddbDocClient.send(command);
            console.log('DynamoDB GetItem succeeded:', response.Item);
            return response.Item || null;
        } catch (err) {
            console.error('DynamoDB GetItem error:\n', err);
            throw err;
        }
    }

    // @param {string} tableName
    // @param {Array} items - Array of objects to put
    // Example: items = [ { id: 1, name: 'Bulbasaur' }, { id: 2, name: 'Ivysaur' }, ... ]
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

    // @param {string} tableName
    // @param {Array} keys - Array of key objects to delete
    // Example: keys = [ { id: 1 }, { id: 2 }, ... ]
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

    // @param {string} tableName
    // Scans the entire table and returns all items
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