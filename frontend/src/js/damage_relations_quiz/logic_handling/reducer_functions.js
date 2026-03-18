/**
 * @file
 * Reducer functions for the Damage Relations Quiz
 *
 * Responsibilities:
 * - Hold reducer functions for managing object states
 * @module DamageRelations_ReducerFunctions
 */


/**
 * @typedef {Object} AnswerObject
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

import { availableTypes } from "./logic";
import { defaultAnswerObject } from "./default_values";

/**
 * @function AnswerObjectReducer
 * @param {Object} state - Current state of the answer object
 * @param {Object} action - Action object containing command and payload
 * @returns { module:DamageRelations_ReducerFunctions~AnswerObject} New state of the answer object
 * @description
 * Reducer function to manage the state of the answer object in the Damage Relations Quiz
 * 
 * Supports commands to move types, reset the state, and switch multipliers
 * 
 * Commands:
 * - MOVE_TYPE: Moves a type to a new effectiveness category and multiplier
 * - RESET: Resets the answer object to its default state
 * - SWITCH_MULTIPLIER: Switches a type's multiplier within its effectiveness category
 * 
 * @example
 * // Example action to move a type
 * dispatchAnswerObject({
 *   command: 'MOVE_TYPE',
 *   payload: { typeToMove: 'Fire', effectiveness: 'Weak-To', multiplier: 'x2' }
 * });
 * @example
 * // Example action to reset the answer object
 * dispatchAnswerObject({
 *   command: 'RESET'
 * });
 * @example
 * // Example action to switch a type's multiplier (Applicable only for 'Resistant-To' and 'Weak-To' categories)
 * dispatchAnswerObject({
 *   command: 'SWITCH_MULTIPLIER',
 *   payload: {
 *     type: 'Water',
 *     multiplier: 'x2'
 *   }
 * });
 */
export const AnswerObjectReducer = (state, action) => {

    const masterOrder = availableTypes;

    function removeTypeFromObject(object, type) {
        for (const [effectiveness, multObj] of Object.entries(object)) {
            for (const [multiplier, array] of Object.entries(multObj)) {
                if (array.includes(type)) {
                    object[effectiveness][multiplier] = array.filter(t => t !== type);
                    break;
                }
            }
        }
        return object;
    }

    switch (action.command) {
        case 'MOVE_TYPE':
            const { typeToMove, effectiveness, multiplier } = action.payload;
            const newState = { ...state };
            // Remove from current location
            removeTypeFromObject(newState, typeToMove);
            const base = newState[effectiveness][multiplier];
            // Add to new location
            const unSorted = [...base, typeToMove];
            // Sort according to master order
            const sorted = [...unSorted].sort((a, b) => {
                const indexA = masterOrder.indexOf(a);
                const indexB = masterOrder.indexOf(b);
                return indexA - indexB;
            });
            newState[effectiveness][multiplier] = sorted;
            return newState;
        case 'RESET':
            return defaultAnswerObject;
        case 'SWITCH_MULTIPLIER':
            const { type: typeToSwitch, multiplier: currentMultiplier } = action.payload;
            const swapObject = {
                "x0.5": "x0.25",
                "x0.25": "x0.5",
                "x2": "x4",
                "x4": "x2"
            };
            if (Object.keys(swapObject).includes(currentMultiplier)) {
                const newState = { ...state };
                const newMultiplier = swapObject[currentMultiplier];
                removeTypeFromObject(newState, typeToSwitch);
                if (currentMultiplier === "x0.5" || currentMultiplier === "x0.25") {
                    newState["Resistant-To"][newMultiplier].push(typeToSwitch);
                } else if (currentMultiplier === "x2" || currentMultiplier === "x4") {
                    newState["Weak-To"][newMultiplier].push(typeToSwitch);
                }
                return newState;
            }
            return state;
        default:
            return state;
    }
}