/**
 * @file 
 * Provides handler functions for fetching Pokémon type data and random Pokémon data.
 * These handlers serve as an interface between UI events and the underlying logic functions. 
 * They manage error propagation and logging for debugging purposes.
 * @module DamageRelations_Handlers
 */

import { fetchSingleType, fetchSingleTypeRandom, fetchDualTypeRandom, fetchDualType, fetchRandomPokemon } from "./logic";

/**
 * Handles fetching data for a specific Pokémon type.
 *
 * @param {string} selectedType - The selected Pokémon type.
 * @returns {Promise<void>} A promise that resolves when the data is fetched and logged.
 * @throws {Error} If fetching the data fails.
 */
export const handleGetSingleType = async (selectedType) => {
    try {
        const data = await fetchSingleType(selectedType);
        console.log("Single Type Data: ", data);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Handles fetching data for two specific Pokémon types.
 *
 * @param {string} selectedType1 - The first selected Pokémon type.
 * @param {string} selectedType2 - The second selected Pokémon type.
 * @returns {Promise<void>} A promise that resolves when the data is fetched and logged.
 * @throws {Error} If fetching the data fails.
 */
export const handleGetDualType = async (selectedType1, selectedType2) => {
    try {
        const data = await fetchDualType(selectedType1, selectedType2);
        console.log("Dual-Type 1 Data: ", data.type1);
        console.log("Dual-Type 2 Data: ", data.type2);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Handles fetching data for a random single Pokémon type.
 *
 * @returns {Promise<Object>} A promise that resolves to the Pokémon type damage relation data object.
 */
export const handleGetSingleTypeRandom = async () => {
    const data = await fetchSingleTypeRandom();
    console.log("Single Type Data: ", data);
    return data;
};

/**
 * Handles fetching data for two random Pokémon types.
 *
 * @returns {Promise<{type1: Object, type2: Object}>} A promise that resolves to an object containing both type data.
 */
export const handleGetDualTypeRandom = async () => {
    const data = await fetchDualTypeRandom();
    console.log("Type 1 Data: ", data.type1);
    console.log("Type 2 Data: ", data.type2);
    return data;
};

/**
 * Handles fetching random Pokémon data including its damage relations.
 *
 * @returns {Promise<{id: number, name: string, type: string[], damage_relations: Object}>} A promise that resolves to the Pokémon data.
 * @throws {Error} If fetching the data fails.
 */
export const handleGetRandomPokemon = async () => {
    try {
        const data = await fetchRandomPokemon();
        console.log("Random Pokémon Data: ", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};