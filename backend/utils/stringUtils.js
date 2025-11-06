import { logError, logSuccess } from "./logger.js";


export const capitalizeFirstLetter = (string) => {
    try {
        if (typeof string !== 'string' || string.length === 0) {
            throw new Error('Input must be a non-empty string');
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    } catch (error) {
        logError('capitalizeFirstLetter', error, { input: string });
        return string; // Return original string if there's an error
    }
};
