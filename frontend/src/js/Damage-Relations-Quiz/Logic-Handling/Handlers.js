/**
 * @file 
 * Module that defines handler functions for the Damage Relations Quiz. <br>
 * Acts as an intermediary between the quiz components and the logic functions defined in Logic.js.
 * @module DamageRelations-Logic-Handlers
 */

import { fetchSingleTypeData, fetchDualTypeData, fetchRandomPokemon } from "./Logic";

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
 * @returns {Promise<module:DamageRelations-Logic~SingleTypeItem>} A promise that resolves to the Pokémon type damage relation data object
 * @throws {Error} If fetching the data fails
 */
export const getSingleTypeDataRandom = async () => {
    try {
        const data = await fetchSingleTypeData({ random: true });
        console.log("Return from 'getSingleTypeDataRandom':", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Handles fetching data for two random Pokémon types
 *
 * @function getDualTypeDataRandom
 * @returns {Promise<module:DamageRelations-Logic~DualTypeItem>} A promise that resolves to an object containing both type data
 * @throws {Error} If fetching the data fails
 */
export const getDualTypeDataRandom = async () => {
    try {
        const data = await fetchDualTypeData({ random: true });
        console.log("Return from 'getDualTypeDataRandom':", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Handles fetching random Pokémon data including its damage relations
 *
 * @function getRandomPokemonData
 * @returns {Promise<module:DamageRelations-Logic~Pokemon>} A promise that resolves to the Pokémon data
 * @throws {Error} If fetching the data fails
 */
export const getRandomPokemonData = async () => {
    try {
        const data = await fetchRandomPokemon();
        console.log("Return from 'getRandomPokemonData':", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};