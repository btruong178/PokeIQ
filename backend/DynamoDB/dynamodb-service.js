import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import { logSuccess, logError } from '../utils/logger.js';

export class DynamoDBService {
    constructor() {
        this.ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
        this.ddbDocClient = DynamoDBDocumentClient.from(this.ddbClient);
    }

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

    async getItem(tableName, key) {
        try {
            const params = {
                TableName: tableName,
                Key: key
            };
            const command = new GetCommand(params);
            const response = await this.ddbDocClient.send(command);
            console.log('DynamoDB GetItem succeeded:', response);
            return response.Item || null;
        } catch (err) {
            console.error('DynamoDB GetItem error:\n', err);
            throw err;
        }
    }

    async batchPutItems(tableName, items) {
        try {
            const putRequests = items.map(item => ({
                PutRequest: {
                    Item: item
                }
            }));
            const command = new BatchWriteCommand({
                RequestItems: {
                    [tableName]: putRequests
                }
            });
            const response = await this.ddbDocClient.send(command);
            console.log('DynamoDB BatchPutItem succeeded:', response);
            return response;
        } catch (err) {
            console.error('DynamoDB BatchPutItem error:\n', err);
            throw err;
        }
    }
}
