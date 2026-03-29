/**
 * @file 
 * Module for logic related to the Damage Relations Quiz <br>
 * All logic-handling functions related to fetching data, validating selections, and processing quiz answers are defined in this module. <br>
 * It also handles API interactions for fetching Pokémon type data.
 * @module DamageRelations-Logic
 */

/**
 * @typedef { Object } TypeItem - The item returned from the API
 * @property { module:DamageRelations-Logic~DamageRelations } damage_relations - The damage relations data
 * @property { string } name - The name of the type
 * @property { number } id - The ID of the type
 */
/**
 * @typedef { Object } SingleTypeItem - The item for single types
 * @property { module:DamageRelations-Logic~TypeItem } type1 - The type's data
 */
/**
 * @typedef { Object } DualTypeItem - The item for dual types
 * @property { module:DamageRelations-Logic~TypeItem } type1 - The first type's data
 * @property { module:DamageRelations-Logic~TypeItem } type2 - The second type's data
 */
/**
 * @typedef { Object } DamageRelations - The damage relations for a Pokémon type
 * @property { module:DamageRelations-Logic~TypeReference[] } double_damage_from - Types that deal double damage to this type
 * @property { module:DamageRelations-Logic~TypeReference[] } double_damage_to - Types that this type deals double damage to
 * @property { module:DamageRelations-Logic~TypeReference[] } half_damage_from - Types that deal half damage to this type
 * @property { module:DamageRelations-Logic~TypeReference[] } half_damage_to - Types that this type deals half damage to
 * @property { module:DamageRelations-Logic~TypeReference[] } no_damage_from - Types that deal no damage to this type
 * @property { module:DamageRelations-Logic~TypeReference[] } no_damage_to - Types that this type deals no damage to
 */
/**
 * @typedef { Object } TypeReference - Name and URL reference for a Pokémon type in each damage relation category
 * @property { string } name - The name of the type
 * @property { string } url - The URL for more information about the type
 */
/**
 * A Pokémon as used by the quiz UI.
 * @typedef { Object } Pokemon - The Pokémon object
 * @property { number } id - The Pokémon's ID
 * @property { string } name - The Pokémon's name
 * @property { string[] } type - The Pokémon's type(s)
 * @property { module:DamageRelations-Logic~TypeItem | module:DamageRelations-Logic~DualTypeItem } dmg_data - The Pokémon's damage relations data
 */

import axios from "axios";

const Random_Pokemon_API_URL = `/dynamoDB-api/random-pokemon`;
const Damage_Relations_API_URL = `/dynamoDB-api/damage-relations`; // '/:typeName' at the end
/**
 * @private
 * @function capitalizeFirstLetter
 * @param {string} string - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * An array of Pokémon types
 *
 * @type {string[]}
 */
export const availableTypes = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
    'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon',
    'dark', 'fairy'
].map(type => capitalizeFirstLetter(type));

/**
 * Returns a random single Pokémon type
 * 
 * @private
 * @function getRandomSingleType
 * @returns {string} A random Pokémon type
 */
const getRandomSingleType = () => {
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    return availableTypes[randomIndex];
}

/**
 * Returns two distinct random Pokémon types
 * 
 * @private
 * @function getRandomDualType
 * @returns {string[]} An array containing two distinct Pokémon types
 */
const getRandomDualType = () => {
    const randomIndex1 = Math.floor(Math.random() * availableTypes.length);
    let randomIndex2 = randomIndex1;
    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * availableTypes.length);
    }
    return [availableTypes[randomIndex1], availableTypes[randomIndex2]];
}

/**
 * Validates that a Pokémon type is provided
 * 
 * @private
 * @function validateSingleType
 * @param {string} type - The Pokémon type to validate
 * @throws {Error} If the type is an empty string
 */
const validateSingleType = (type) => {
    if (type === "") {
        throw new Error("Missing type");
    }
}

/**
 * Validates that two distinct Pokémon types are provided
 *
 * @private
 * @function validateDualType
 * @param {string} type1 - The first Pokémon type to validate
 * @param {string} type2 - The second Pokémon type to validate
 * @throws {Error} If either type is missing or if both types are the same
 */
const validateDualType = (type1, type2) => {
    if (type1 === "" || type2 === "") {
        throw new Error("Missing type(s)");
    }
    if (type1 === type2) {
        throw new Error("Cannot have the same type twice");
    }
};

/**
 * Fetches damage relations data for a single Pokémon type
 * 
 * @async
 * @function fetchSingleTypeData
 * @param {Object} options - Options for fetching data
 * @param {boolean} options.random - Whether to fetch a random type or not
 * @param {string} [type = ""] - The Pokémon type to fetch data for if not random
 * @returns {Promise<module:DamageRelations-Logic~SingleTypeItem>} Damage relations response
 * @throws {Error} If validation fails or the network request fails
 */
export const fetchSingleTypeData = async (options, type = "") => {
    try {
        const selectedType = options.random ? getRandomSingleType() : type;
        validateSingleType(selectedType);
        const response = await axios.get(`${Damage_Relations_API_URL}/${selectedType}`);
        console.log("Return from 'fetchSingleTypeData':", { type1: response.data.item });
        return { type1: response.data.item };
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Fetches damage relations data for two Pokémon types
 * 
 * @async
 * @function fetchDualTypeData
 * @param {Object} options - Options for fetching data
 * @param {boolean} options.random - Whether to fetch random types or not
 * @param {string} [type1 = ""] - The first Pokémon type to fetch data for if not random
 * @param {string} [type2 = ""] - The second Pokémon type to fetch data for if not random
 * @returns {Promise<module:DamageRelations-Logic~DualTypeItem>} Damage relations responses for both types
 * @throws {Error} If validation fails or the network request fails
 */
export const fetchDualTypeData = async (options, type1 = "", type2 = "") => {
    try {
        const [selectedType1, selectedType2] = options.random ? getRandomDualType() : [type1, type2];
        validateDualType(selectedType1, selectedType2);
        const type1Data = await fetchSingleTypeData({ random: false }, selectedType1);
        const type2Data = await fetchSingleTypeData({ random: false }, selectedType2);
        console.log("Return from 'fetchDualTypeData':", { type1: type1Data.type1, type2: type2Data.type1 });
        return { type1: type1Data.type1, type2: type2Data.type1 };
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Fetches random Pokémon data including its damage relations
 * 
 * @async
 * @public
 * @function fetchRandomPokemon
 * @returns {Promise<module:DamageRelations-Logic~Pokemon>} The Pokémon data object
 * @throws {Error} If the network request fails
 */
export const fetchRandomPokemon = async () => {
    try {
        const result = await axios.get(`${Random_Pokemon_API_URL}`);
        const { id, name, type } = result.data.item;
        let types;
        let damage_relations;
        if (type.includes("/")) {
            types = type.split("/").map(t => t.trim());
            damage_relations = await fetchDualTypeData({ random: false }, types[0], types[1]);
        } else {
            types = [type];
            damage_relations = await fetchSingleTypeData({ random: false }, type);
        }
        return { id, name, type: types, dmg_data: damage_relations };
    } catch (error) {
        throw new Error(error.message);
    }
};


