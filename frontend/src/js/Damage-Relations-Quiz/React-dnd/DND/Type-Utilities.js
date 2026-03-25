/**
 * @file
 * Utility functions and constants for the React DnD implementation in the Damage Relations Quiz
 * 
 * Responsibilities:
 * - Provides helper functions and constants for the drag-and-drop functionality of Pokémon types in the quiz
 * - Provide a mapping of Pokémon types to their corresponding CSS classes for styling the drag preview
 * 
 * @module DamageRelations-TypeUtilities
 */

/**
 * @constant
 * @type {Object}
 * @description
 * Mapping of Pokémon types to their corresponding CSS classes for styling
 * Used to apply the correct styles to the drag preview when a type is being dragged in the quiz
 */
export const styleLookup = {
    Normal: 'type-normal',
    Fire: 'type-fire',
    Water: 'type-water',
    Electric: 'type-electric',
    Grass: 'type-grass',
    Ice: 'type-ice',
    Fighting: 'type-fighting',
    Poison: 'type-poison',
    Ground: 'type-ground',
    Flying: 'type-flying',
    Psychic: 'type-psychic',
    Bug: 'type-bug',
    Rock: 'type-rock',
    Ghost: 'type-ghost',
    Dragon: 'type-dragon',
    Dark: 'type-dark',
    Steel: 'type-steel',
    Fairy: 'type-fairy'
};