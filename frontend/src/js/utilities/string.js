/**
 * @file
 * Utility functions for string manipulation
 * @module Utilities_String
 */

/**
 * Capitalizes the first letter of the given string.
 * @function capitalizeFirstLetter
 * @param {string} string - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}