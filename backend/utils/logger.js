/**
 * Logs errors with explicit context information
 * @param {string} functionName - Name of the function where error occurred
 * @param {Error} error - The error object
 * @param {Object} context - Additional context (table names, params, etc.)
 */
export const logError = (functionName, error, context = {}) => {
    const filePath = new Error().stack?.split('\n')[2]?.match(/\((.+?):\d+:\d+\)/)?.[1] || 'unknown';
    
    console.error('\n' + '='.repeat(80));
    console.error('❌ ERROR OCCURRED');
    console.error('─'.repeat(80));
    console.error('Function:', functionName);
    console.error('File:', filePath);
    console.error('Message:', error.message);
    if (Object.keys(context).length > 0) {
        console.error('─'.repeat(80));
        console.error('Context:', JSON.stringify(context, null, 2));
    }
    console.error('─'.repeat(80));
    console.error('Stack Trace:');
    console.error(error.stack);
    console.error('='.repeat(80) + '\n');
};

/**
 * Logs success messages
 */
export const logSuccess = (functionName, message, data = {}) => {
    console.log('\n' + '='.repeat(80));
    console.log('✅ SUCCESS');
    console.log('─'.repeat(80));
    console.log('Function:', functionName);
    console.log('Message:', message);
    if (Object.keys(data).length > 0) {
        console.log('Data:', JSON.stringify(data, null, 2));
    }
    console.log('='.repeat(80) + '\n');
};