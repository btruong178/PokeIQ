import { DynamoDBService } from "./dynamodb-service.js";
import { logError, logSuccess } from '../utils/logger.js';
import { capitalizeFirstLetter } from '../utils/stringUtils.js';
import express from 'express';

// Initialize Clients
const dynamoDBService = new DynamoDBService();
const router = express.Router();

router.get('/health-check', async (req, res) => {
    try {
        const result = await dynamoDBService.healthCheck();
        logSuccess('Health Check Endpoint', 'DynamoDB connection is healthy', result);
        return res.status(200).json({ status: 'success', message: 'Health check passed', data: result });
    } catch (error) {
        // Fixed: Pass error object correctly
        logError('Health Check Endpoint', error);
        return res.status(500).json({
            status: 'error',
            message: 'Health check failed',
            error: error.message
        });
    }
});

export default router;
