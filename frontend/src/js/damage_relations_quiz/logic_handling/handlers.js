/**
 * @file 
 * Logic Handling for Damage Relations Quiz that acts as an intermediary between UI components and backend logic
 * 
 * Responsibilities:
 * - Handle requests for specific and random Pokémon types (single/dual)
 * - Handle requests for random Pokémon data
 * 
 * @module DamageRelations_Handlers
 */

import { fetchSingleTypeData, fetchDualTypeData, fetchRandomPokemon } from "./logic";

/**
 * Logs data for a specific Pokémon type
 *
 * @private
 * @function logHandleGetSingleType
 * @param {string} selectedType - The selected Pokémon type
 * @returns {Promise<void>} A promise that resolves when the data is fetched and logged
 * @throws {Error} If fetching the data fails
 */
export const logHandleGetSingleType = async (selectedType) => {
    try {
        const data = await fetchSingleTypeData({ random: false }, selectedType);
        console.log("Single Type Data: ", data);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Logs data for two specific Pokémon types
 *
 * @private
 * @function logHandleGetDualType
 * @param {string} selectedType1 - The first selected Pokémon type
 * @param {string} selectedType2 - The second selected Pokémon type
 * @returns {Promise<void>} A promise that resolves when the data is fetched and logged
 * @throws {Error} If fetching the data fails
 */
export const logHandleGetDualType = async (selectedType1, selectedType2) => {
    try {
        const data = await fetchDualTypeData({ random: false }, selectedType1, selectedType2);
        console.log("Dual-Type 1 Data: ", data.type1);
        console.log("Dual-Type 2 Data: ", data.type2);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Handles fetching data for a random single Pokémon type
 *
 * @function getSingleTypeDataRandom
 * @returns {Promise<module:DamageRelations_Logic~TypeItem>} A promise that resolves to the Pokémon type damage relation data object
 * @throws {Error} If fetching the data fails
 */
export const getSingleTypeDataRandom = async () => {
    try {
        const data = await fetchSingleTypeData({ random: true });
        console.log("Data from 'getSingleTypeDataRandom':", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Handles fetching data for two random Pokémon types
 *
 * @function getDualTypeDataRandom
 * @returns {Promise<{type1: module:DamageRelations_Logic~TypeItem, type2: module:DamageRelations_Logic~TypeItem}>} A promise that resolves to an object containing both type data
 * @throws {Error} If fetching the data fails
 */
export const getDualTypeDataRandom = async () => {
    try {
        const data = await fetchDualTypeData({ random: true });
        console.log("Data from 'getDualTypeDataRandom':", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Handles fetching random Pokémon data including its damage relations
 *
 * @function getRandomPokemonData
 * @returns {Promise<module:DamageRelations_Logic~Pokemon>} A promise that resolves to the Pokémon data
 * @throws {Error} If fetching the data fails
 */
export const getRandomPokemonData = async () => {
    try {
        const data = await fetchRandomPokemon();
        console.log("Random Pokémon Data: ", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};