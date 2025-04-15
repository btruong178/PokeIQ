/**
 * @file
 * Provides functions to fetch damage relations for Pokémon types.
 * This includes fetching data for single and dual types.
 * It also includes functions to fetch an existing random Pokémon's type.
 * @module DamageRelations_Logic
 */

import axios from "axios";

const Random_Pokemon_API_URL = 'http://localhost:5000/pokemon/random_pokemon';
const Damage_Relations_API_URL = 'http://localhost:5000/pokemon/damage_relations'; // '/:typeName' at the end

/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} string - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * An array of available Pokémon types.
 *
 * @type {string[]}
 */
export const availableTypes = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
    'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon',
    'dark', 'fairy'
].map(type => capitalizeFirstLetter(type));

/**
 * Returns a random single Pokémon type.
 *
 * @returns {string} A random Pokémon type.
 */
export const RandomTypeSingle = () => {
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    return availableTypes[randomIndex];
}

/**
 * Returns two distinct random Pokémon types.
 *
 * @returns {string[]} An array containing two distinct Pokémon types.
 */
export const RandomTypeDual = () => {
    const randomIndex1 = Math.floor(Math.random() * availableTypes.length);
    let randomIndex2 = randomIndex1;
    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * availableTypes.length);
    }
    return [availableTypes[randomIndex1], availableTypes[randomIndex2]];
}

/**
 * Validates that a Pokémon type is provided.
 *
 * @param {string} type - The Pokémon type to validate.
 * @throws {Error} If the type is an empty string.
 */
const validateSingleType = (type) => {
    if (type === "") {
        throw new Error("No Type Selected");
    }
}

/**
 * Validates that two distinct Pokémon types are provided.
 *
 * @param {string} type1 - The first Pokémon type.
 * @param {string} type2 - The second Pokémon type.
 * @throws {Error} If either type is missing or if both types are the same.
 */
const validateDualType = (type1, type2) => {
    if (type1 === "" || type2 === "") {
        throw new Error("Missing type(s)");
    }
    if (type1 === type2) {
        throw new Error("Cannot have the same type twice.");
    }
};

/**
 * Fetches damage relations data for a single Pokémon type.
 *
 * @param {string} type - The Pokémon type to fetch data for.
 * @returns {Promise<Object>} A promise that resolves to the Pokémon type damage relations data.
 * @throws {Error} If validation fails or the network request fails.
 */
export const fetchSingleType = async (type) => {
    try {
        validateSingleType(type);
        const response = await axios.get(`${Damage_Relations_API_URL}/${type}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

/**
 * Fetches data for two Pokémon types.
 *
 * @param {string} type1 - The first Pokémon type.
 * @param {string} type2 - The second Pokémon type.
 * @returns {Promise<{type1: Object, type2: Object}>} A promise that resolves to an object containing both damage relation type data.
 * @throws {Error} If validation fails or the network request fails.
 */
export const fetchDualType = async (type1, type2) => {
    try {
        validateDualType(type1, type2);
        const type1Data = await fetchSingleType(type1);
        const type2Data = await fetchSingleType(type2);
        return { type1: type1Data, type2: type2Data };
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

/**
 * Fetches data for a random single Pokémon type.
 *
 * @returns {Promise<Object>} A promise that resolves to the Pokémon type damage relation data object.
 * @throws {Error} If fetching the data fails.
 */
export const fetchSingleTypeRandom = async () => {
    try {
        const RandomType = RandomTypeSingle();
        const data = await fetchSingleType(RandomType);
        return data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
};

/**
 * Fetches data for two random Pokémon types.
 *
 * @returns {Promise<{type1: Object, type2: Object}>} A promise that resolves to an object containing both type data.
 * @throws {Error} If fetching the data fails.
 */
export const fetchDualTypeRandom = async () => {
    try {
        const [RandomType1, RandomType2] = RandomTypeDual();
        const data = await fetchDualType(RandomType1, RandomType2);
        return data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
};

/**
 * Fetches random Pokémon data including its damage relations.
 *
 * @returns {Promise<{id: number, name: string, type: string[], damage_relations: Object}>} A promise that resolves to the Pokémon data.
 * @throws {Error} If the network request fails.
 */
export const fetchRandomPokemon = async () => {
    try {
        const result = await axios.get(`${Random_Pokemon_API_URL}`);
        const { id, name, type } = result.data;
        let damage_relations = {};
        if (type.includes("/")) {
            const types = type.split("/").map(t => t.trim());
            damage_relations = await fetchDualType(types[0], types[1]);
            return { id, name, type: types, damage_relations: damage_relations };
        } else {
            damage_relations = await fetchSingleType(type);
            return { id, name, type: [type], damage_relations: damage_relations };
        }
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
};


