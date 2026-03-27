/**
 * @file
 * Default values used in the Damage Relations Quiz
 */
import { availableTypes } from "./Logic";

/**
 * @memberof module:DamageRelations-Quiz
 * @description
 * Object representing the default state of the responseState Object used in the Damage Relations Quiz.
 * @type {module:DamageRelations-Reducers~responseState}
 * @property {Object} unSelected - Holds the unselected multipliers
 * @property {string[]} unSelected.N/A - Array of unselected types
 * @property {Object} Immune-To - Holds the immune multipliers
 * @property {string[]} Immune-To.x0 - Array of immune types
 * @property {Object} Resistant-To - Holds the resistant multipliers
 * @property {string[]} Resistant-To.x0.5 - Array of types resistant with x0.5 multiplier
 * @property {string[]} Resistant-To.x0.25 - Array of types resistant with x0.25 multiplier
 * @property {Object} Normally-Damaged - Holds the normally damaged multipliers
 * @property {string[]} Normally-Damaged.x1 - Array of normally damaged types
 * @property {Object} Weak-To - Holds the weak multipliers
 * @property {string[]} Weak-To.x2 - Array of types weak with x2 multiplier
 * @property {string[]} Weak-To.x4 - Array of types weak with x4 multiplier
 */
const defaultResponseState = {
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
 * @memberof module:DamageRelations-Quiz
 * @description
 * Object representing the default state of a Pokémon used in the quiz.
 * @type {module:DamageRelations-Logic~Pokemon}
 * @property {null} id - The default ID of the Pokémon, set to null.
 * @property {string} name - The default name of the Pokémon, set to an empty string.
 * @property {string[]} type - The default type(s) of the Pokémon, set to an empty array.
 * @property {Object} dmg_data - The default damage data of the Pokémon, set to an empty object.
 */
const defaultPokemon = {
    id: null,
    name: "",
    type: [],
    dmg_data: {}
};

export { defaultResponseState, defaultPokemon };