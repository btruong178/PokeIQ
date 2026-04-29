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
};