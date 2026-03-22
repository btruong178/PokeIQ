/**
 * @file
 * Constants for default values used in the Damage Relations Quiz
 * 
 * Responsibilities:
 * - Provide default values for the quiz's answer object and Pokémon data
 *
 * @module DamageRelations_DefaultValues
 */
import { availableTypes } from "./logic";

/**
 * Object representing the default state of the answer object used in the quiz, categorizing Pokémon types based on their damage relations (e.g., immune, resistant, weak) with default values set to empty arrays or the list of available types for unselected categories.
 * @type {Object}
 * @property {Object} unSelected - Contains a key "N/A" with an array of all available types, representing types that have not been selected by the user.
 * @property {Object} Immune-To - Contains a key "x0" with an empty array, representing types that deal no damage to the selected type(s).
 * @property {Object} Resistant-To - Contains keys "x0.5" and "x0.25" with empty arrays, representing types that deal half or quarter damage to the selected type(s).
 * @property {Object} Normally-Damaged - Contains a key "x1" with an empty array, representing types that deal normal damage to the selected type(s).
 * @property {Object} Weak-To - Contains keys "x2" and "x4" with empty arrays, representing types that deal double or quadruple damage to the selected type(s).
 */
export const defaultAnswerObject = {
    "unSelected": {
        "N/A": availableTypes
    },
    "Immune-To": {
        "x0": [],
    },
    "Resistant-To": {
        "x0.5": [],
        "x0.25": []
    },
    "Normally-Damaged": {
        "x1": [],
    },
    "Weak-To": {
        "x2": [],
        "x4": []
    }
};
/**
 * Object representing the default state of a Pokémon used in the quiz, with properties for id, name, type, and damage relations initialized to null, an empty string, an empty array, and an empty object respectively.
 * @type { module:DamageRelations_Logic~Pokemon }
 * @property {number|null} id - The default ID of the Pokémon, set to null.
 * @property {string} name - The default name of the Pokémon, set to an empty string.
 * @property {string[]} type - The default type(s) of the Pokémon, set to an empty array.
 * @property {Object} dmg_data - The default damage data of the Pokémon, set to an empty object.
 */
export const defaultPokemon = {
    id: null,
    name: "",
    type: [],
    dmg_data: {}
};