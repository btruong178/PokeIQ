/**
 * @file
 * Utility functions and constants for the Damage Relations Quiz React-DND components
 */

/**
 * @memberof module:DamageRelations-ReactDND
 * @constant {Object}
 * @description
 * A lookup object that maps Pokémon type names to their corresponding CSS class names for styling purposes.
 * This allows for consistent styling of type buttons and drag previews based on the Pokémon type.
 */
const styleLookup = {
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

export { styleLookup };