/**
 * @file Backend server entrypoint
 * @description
 * Setups the Express Server.
 * Configures global middleware and mounts backend API routes.
 * @module Server
 */

import express from 'express';
import cors from 'cors';
import dynamodbApiRouter from './DynamoDB/dynamodb-api.js';

const app = express();

/**
 * Enable cross-origin requests and JSON body parsing globally.
 */
app.use(cors());
app.use(express.json());

/**
 * Root endpoint to verify that the backend server is running.
 * @returns {string} Welcome message when the backend is running.
 */
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
});

/**
 * Mount all DynamoDB-related API endpoints.
 * Example: GET /dynamoDB-api/health-check
 */
app.use('/dynamoDB-api', dynamodbApiRouter);

const port = process.env.PORT;

/**
 * Start the HTTP server.
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});