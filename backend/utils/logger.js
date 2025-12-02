import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, '..', 'logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const getLogFilePath = (type) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, ''); // YYYY-MM-DDTHH-MM-SS
    return path.join(logsDir, `${type}-${timestamp}.log`);
};

/**
 * Logs errors with explicit context information
 * @param {string} functionName - Name of the function where error occurred
 * @param {Error} error - The error object
 * @param {Object} context - Additional context (table names, params, etc.)
 */
export const logError = (functionName, error, context = {}) => {
    const filePath = new Error().stack?.split('\n')[2]?.match(/\((.+?):\d+:\d+\)/)?.[1] || 'unknown';
    const timestamp = new Date().toISOString();

    const logMessage = [
        '\n' + '='.repeat(80),
        '❌ ERROR OCCURRED (Logger)',
        '─'.repeat(80),
        `Timestamp: ${timestamp}`,
        `Function: ${functionName}`,
        `File: ${filePath}`,
        `Message: ${error.message}`,
        Object.keys(context).length > 0 ? '─'.repeat(80) + '\nContext: ' + JSON.stringify(context, null, 2) : '',
        '─'.repeat(80),
        'Stack Trace:',
        error.stack,
        '='.repeat(80) + '\n'
    ].filter(Boolean).join('\n');

    console.error(logMessage);

    try {
        fs.appendFileSync(getLogFilePath('error'), logMessage, 'utf8');
    } catch (err) {
        console.error('Failed to write error log to file:', err);
    }
};

/**
 * Logs success messages
 */
export const logSuccess = (functionName, message, data = {}) => {
    const timestamp = new Date().toISOString();



    const logMessage = [
        '\n' + '='.repeat(80),
        '✅ SUCCESS (Logger)',
        '─'.repeat(80),
        `Timestamp: ${timestamp}`,
        `Function: ${functionName}`,
        `Message: ${message}`,
        Object.keys(data).length > 0 ? `Data: ${JSON.stringify(data, null, 2)}` : '',
        '='.repeat(80) + '\n'
    ].filter(Boolean).join('\n');

    console.log(logMessage);

    try {
        fs.appendFileSync(getLogFilePath('success'), logMessage, 'utf8');
    } catch (err) {
        console.error('Failed to write success log to file:', err);
    }
};